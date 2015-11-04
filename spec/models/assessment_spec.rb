require 'rails_helper'

describe Assessment do
  it { should have_many(:assessment_questions) }
  it { should have_many(:user_assessments) }
end
