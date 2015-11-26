require 'rails_helper'

describe QuestionRecommendation do
  it { should belong_to(:assessment_question) }
  it { should belong_to(:recommendable) }

  describe '#external_id' do
    it 'is not set before save' do
      subject = build(:question_recommendation)
      expect(subject.external_id).to be_blank
    end

    it 'is set after save to the question external_recommendation_id' do
      subject = create(:question_recommendation)
      question = subject.assessment_question

      expect(subject.external_id).to eq(question.external_recommendation_id)
    end
  end
end
