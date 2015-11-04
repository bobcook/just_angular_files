require 'rails_helper'

describe AssessmentQuestion do
  it { should have_many(:assessment_responses) }
  it { should belong_to(:assessment) }
end
