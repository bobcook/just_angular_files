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
    let(:days_ago_created) { 15 }

    let(:user_activity) do
      create :user_activity,
             created_at: (Date.today - days_ago_created.days)
    end

    let(:existing_activity_period) do
      create :user_activity_period, completed_date: 2.days.ago
    end

    it 'returns one record per day since its creation' do
      expect(user_activity.stubbed_activity_periods.length)
        .to eq(days_ago_created + 1)
    end

    it 'returns non-persisted records for dates without activity periods' do
      user_activity.user_activity_periods << existing_activity_period

      stubbed_periods = user_activity.stubbed_activity_periods
      non_persisted_periods = stubbed_periods.reject(&:persisted?)

      expect(non_persisted_periods.length).to eq days_ago_created
    end

    it 'returns pre-existing activity periods' do
      user_activity.user_activity_periods << existing_activity_period

      stubbed_periods = user_activity.stubbed_activity_periods

      expect(stubbed_periods).to include existing_activity_period
    end
  end
end
