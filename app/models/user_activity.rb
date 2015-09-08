class UserActivity < ActiveRecord::Base
  belongs_to :user
  belongs_to :activity
  has_one :activity_reminder_setting

  # TODO: error message not showing up
  validates :user_id, uniqueness: {
    scope: :activity_id, message: 'activity already saved'
  }
end
