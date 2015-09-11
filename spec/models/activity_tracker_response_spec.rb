require 'rails_helper'

describe ActivityTrackerResponse do
  it { should belong_to(:activity_tracker_question) }
  it { should belong_to(:user_activity_period) }
end
