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
end
