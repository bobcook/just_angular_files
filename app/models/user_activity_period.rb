class UserActivityPeriod < ActiveRecord::Base
  belongs_to :user_activity
  has_many :activity_tracker_responses
end
