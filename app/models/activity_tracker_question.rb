class ActivityTrackerQuestion < ActiveRecord::Base
  belongs_to :activity_tracker
  has_many :activity_tracker_responses
end
