require 'rails_helper'

describe UserAssessment do
  it { should have_one(:user).through(:user_assessment_group) }
  it { should have_many(:assessment_responses) }
  it { should belong_to(:assessment) }
end
