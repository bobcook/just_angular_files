module WithPillars
  extend ActiveSupport::Concern

  class_methods do
    def maybe_for_pillar(maybe_pillar)
      maybe_pillar ? for_pillar(maybe_pillar) : all
    end

    def for_pillar(pillar)
      pillar = pillar.is_a?(Pillar) ? pillar : Pillar.find_by!(slug: pillar)
      pillar.send(plural_resource_name).merge(all)
    end

    def plural_resource_name
      name.downcase.pluralize
    end
  end

  def pillar_names
    pillars.map(&:name)
  end

  def pillar_slugs
    pillars.map(&:slug)
  end

  def displayable_pillar_names(separator = ' ')
    pillar_names.join(separator)
  end
end
