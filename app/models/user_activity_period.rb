class UserActivityPeriod < ActiveRecord::Base
  belongs_to :user_activity
  has_many :activity_tracker_responses, dependent: :destroy

  validates :completed_date, presence: true
end
