require 'rails_helper'

describe UserAssessment do
  it { should belong_to(:user) }
  it { should have_many(:assessment_responses) }
  it { should belong_to(:assessment) }
end
