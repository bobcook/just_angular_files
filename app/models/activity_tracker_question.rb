class ActivityTrackerQuestion < ActiveRecord::Base
  belongs_to :activity_tracker
  has_many :activity_tracker_responses

  accepts_nested_attributes_for :activity_tracker_responses
end
