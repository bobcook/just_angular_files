class ActivityTrackerResponse < ActiveRecord::Base
  belongs_to :activity_tracker_question
  belongs_to :user_activity_period

  validates :response, presence: true

  def self.new_blank_response(attrs = {})
    ActivityTrackerResponse.new attrs.merge response: 0
  end
end
