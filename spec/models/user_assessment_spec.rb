require 'rails_helper'

describe UserAssessment do
  it { should have_one(:user).through(:user_assessment_group) }
  it { should have_many(:assessment_responses) }
  it { should belong_to(:assessment) }

  describe '#results' do
    it 'delegates to assessment#parse_results' do
      subject = create(:user_assessment, :with_mbs_results)
      assessment = subject.assessment

      expect(assessment).to receive(:parse_results).with(subject.raw_results)
      subject.results
    end
  end
end
