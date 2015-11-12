class UserActivity < ActiveRecord::Base
  belongs_to :user
  belongs_to :activity
  has_one :activity_reminder_setting
  has_many :user_activity_periods, dependent: :destroy

  # TODO: error message not showing up
  validates :user_id, uniqueness: {
    scope: :activity_id, message: 'activity already saved'
  }

  def stubbed_activity_periods(options = {})
    stubbed_period_date_range(options).map do |day|
      user_activity_periods.where(completed_date: day...(day + 1)).first ||
        stubbed_activity_period(day)
    end
  end

  # TODO: remove if possible
  def days_with_activities(today)
    days_for_a_week(today).map do |day|
      UserActivityPeriod.find_or_initialize_by(
        completed_date: day, user_activity: self
      )
    end
  end

  private

  def stubbed_period_date_range(options = {})
    create_time ||= options[:created_at] || created_at
    current_time ||= options[:current_time] || Time.now # .utc.to_date ?

    # Send 1 extra day to account for user tz offset; client should choose
    # whether or not to use the extra day
    start_date = utc_date(create_time).at_beginning_of_week + 1 # Start Monday
    end_date = utc_date(current_time + 1.day)
    (start_date..end_date)
  end

  def utc_date(date)
    date.utc.to_date
  end

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

  # TODO: remove if possible
  def days_for_a_week(date)
    (date.at_beginning_of_week..date).to_a
  end
end
