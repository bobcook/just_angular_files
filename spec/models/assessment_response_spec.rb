require 'rails_helper'

describe AssessmentResponse do
  it { should belong_to(:user_assessment) }
  it { should belong_to(:assessment_question) }
end
