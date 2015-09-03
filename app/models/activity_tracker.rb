class ActivityTracker < ActiveRecord::Base
  has_many :activities, inverse_of: :activity_tracker

  def self.default_types
    %w(binary quantity scale)
  end

  default_types.each do |type|
    define_method "#{type}?" do
      name == type
    end
  end
end
