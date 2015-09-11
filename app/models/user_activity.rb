class UserActivity < ActiveRecord::Base
  belongs_to :user
  belongs_to :activity
  has_one :activity_reminder_setting
  has_many :user_activity_periods

  # TODO: error message not showing up
  validates :user_id, uniqueness: {
    scope: :activity_id, message: 'activity already saved'
  }

  def days_with_activities(today)
    days_for_a_week(today).map do |day|
      UserActivityPeriod.find_or_initialize_by(
        completed_date: day, user_activity: self
      )
    end
  end

  private

  def days_for_a_week(date)
    (date.at_beginning_of_week..date).to_a
  end
end
