require 'rails_helper'

describe UserActivity do
  it { should belong_to(:user) }
  it { should belong_to(:activity) }

  it 'validates uniqueness of user and activity' do
    user = create(:user)
    activity = create(:activity)

    user_activity_1 = create(:user_activity, user: user, activity: activity)
    expect(user_activity_1).to be_valid

    user_activity_2 = build(:user_activity, user: user, activity: activity)
    expect(user_activity_2).to be_invalid
  end

  describe '#stubbed_activity_periods' do
    let(:freeze_time) do
      DateTime.parse('1/1/2016')
    end

    def make_user_activity(created_at)
      create :user_activity, created_at: created_at
    end

    def make_existing_activity_period(completed_date)
      create :user_activity_period, completed_date: completed_date
    end

    it 'returns one record per day since the beginning of start week' do
      today_in_utc = Time.now.utc.to_date
      day_created = today_in_utc - 15.days
      beginning_of_creation_week = day_created.at_beginning_of_week + 1.day

      expected_num_days =
          (today_in_utc.at_end_of_week - beginning_of_creation_week).to_i + 2
      user_activity = make_user_activity(day_created)

      expect(user_activity.stubbed_activity_periods.length)
        .to eq(expected_num_days)
    end

    it 'returns non-persisted records for dates without activity periods' do
      today_in_utc = Time.now.utc.to_date
      day_created = today_in_utc - 15.days
      beginning_of_creation_week = day_created.at_beginning_of_week + 1.day

      user_activity = make_user_activity(day_created)
      existing_activity_period = make_existing_activity_period(2.days.ago)

      user_activity.user_activity_periods << existing_activity_period

      stubbed_periods = user_activity.stubbed_activity_periods
      non_persisted_periods = stubbed_periods.reject(&:persisted?)
      expected_num_days =
          (today_in_utc.at_end_of_week - beginning_of_creation_week).to_i + 1

      expect(non_persisted_periods.length).to eq expected_num_days
    end

    it 'returns pre-existing activity periods' do
      today_in_utc = Time.now.utc.to_date
      days_ago_created = 15
      user_activity = make_user_activity(today_in_utc - days_ago_created.days)
      existing_activity_period = make_existing_activity_period(2.days.ago)

      user_activity.user_activity_periods << existing_activity_period

      stubbed_periods = user_activity.stubbed_activity_periods

      expect(stubbed_periods).to include existing_activity_period
    end
  end
end
