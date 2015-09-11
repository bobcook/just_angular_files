require 'rails_helper'

describe ActivityTrackerQuestion do
  it { should belong_to(:activity_tracker) }
  it { should have_many(:activity_tracker_responses) }
end
