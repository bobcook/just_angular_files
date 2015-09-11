class ActivityTrackerResponse < ActiveRecord::Base
  belongs_to :activity_tracker_question
  belongs_to :user_activity_period

  validates :response, presence: true
end
