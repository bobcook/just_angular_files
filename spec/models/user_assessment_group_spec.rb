require 'rails_helper'

describe UserAssessmentGroup do
  it { should belong_to(:user) }
  it { should have_many(:user_assessments) }
end
