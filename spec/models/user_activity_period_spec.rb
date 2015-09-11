require 'rails_helper'

describe UserActivityPeriod do
  it { should belong_to(:user_activity) }
  it { should have_many(:activity_tracker_responses) }
end
