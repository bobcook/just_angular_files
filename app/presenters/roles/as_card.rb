module Roles
  class AsCard
    include ActionView::Helpers::TagHelper
    include ActionView::Context

    attr_reader :resource

    def initialize(resource)
      @resource = resource
    end

    def upper_right
      '64' # TODO: real value
    end

    def upper_left
      resource.class_name.capitalize
    end

    def lower_right
      '85%' # TODO: real value
    end

    def lower_left
      resource.try(:recommended_effort_time) || resource.try(:read_time)
    end

    def card_title
      resource.title
    end

    def resource_path
      Rails.application.routes.url_helpers.send(resource_path_name, resource)
    end

    def displayable_pillars
      resource.pillar_names.map do |pillar_name|
        content_tag :span, class: "pillar #{pillar_name.parameterize}" do
          pillar_name
        end
      end.join(' ')
    end

    private

    def resource_path_name
      klass = resource.class
      name = klass.respond_to?(:name) ? klass.name : klass
      "#{name.downcase}_path"
    end
  end
end
