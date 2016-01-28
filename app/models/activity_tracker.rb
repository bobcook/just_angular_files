class ActivityTracker < ActiveRecord::Base
  has_many :activities, inverse_of: :activity_tracker
  has_many :activity_tracker_questions

  accepts_nested_attributes_for :activity_tracker_questions

  def self.default_types
    %w(
      binary
      quantity_steps
      quantity_miles
      quantity_servings
      quantity_units
      quantity_minutes
      scale
    )
  end

  default_types.each do |type|
    define_method "#{type}?" do
      name == type
    end
  end
end
