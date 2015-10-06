class UserActivity < ActiveRecord::Base
  belongs_to :user
  belongs_to :activity
  has_one :activity_reminder_setting
  has_many :user_activity_periods

  # TODO: error message not showing up
  validates :user_id, uniqueness: {
    scope: :activity_id, message: 'activity already saved'
  }

  def stubbed_activity_periods
    (created_at.to_date..Date.today).map do |day|
      user_activity_periods.where(completed_date: day...(day + 1)).first ||
        stubbed_activity_period(day)
    end
  end

  def days_with_activities(today)
    days_for_a_week(today).map do |day|
      UserActivityPeriod.find_or_initialize_by(
        completed_date: day, user_activity: self
      )
    end
  end

  private

  def stubbed_activity_period(date)
    questions = activity.activity_tracker.activity_tracker_questions
    user_activity_periods.new(
      completed_date: date,
      activity_tracker_responses: stubbed_responses(questions)
    )
  end

  def stubbed_responses(questions)
    questions.map do |question|
      question.activity_tracker_responses.new_blank_response
    end
  end

  def days_for_a_week(date)
    (date.at_beginning_of_week..date).to_a
  end
end
