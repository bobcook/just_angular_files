module Publishable
  extend ActiveSupport::Concern

  included do
    before_save :set_publishable_defaults
  end

  class_methods do
    def newest_first
      order(last_modified: :desc)
    end
  end

  private

  def set_publishable_defaults
    self.last_modified ||= current_time
    self.published_at ||= current_time
  end

  def current_time
    Time.current
  end
end
