require 'rails_helper'

module AssessmentResults
  describe Latest do
    let(:user) { create(:user) }

    def make_subject(user)
      AssessmentResults::Latest.new(user)
    end

    describe '#ready?' do
      it 'calls Apis::MBS::Endpoints#all_assessments' do
        subject = make_subject(user)
        endpoints = double
        assessment_history = double(body: {})
        allow(subject).to receive(:mbs_api).and_return(endpoints)

        expect(endpoints)
          .to receive(:all_assessments).and_return(assessment_history)

        subject.ready?
      end

      it 'is false if there are no assessments from MBS' do
        subject = make_subject(user)
        allow(subject).to receive(:any_assessments?).and_return(false)

        expect(subject.ready?).to eq(false)
      end

      it 'is false if the latest assessment from MBS is already saved' do
        subject = make_subject(user)
        allow(subject).to receive(:latest_assessment_new?).and_return(false)
        allow(subject).to receive(:any_assessments?).and_return(true)
        allow(subject).to receive(:assessment_history)

        expect(subject.ready?).to eq(false)
      end

      it 'is false if the assessment data is not ready' do
        subject = make_subject(user)
        allow(subject).to receive(:latest_assessment_new?).and_return(true)
        allow(subject).to receive(:any_assessments?).and_return(true)
        allow(subject).to receive(:assessment_results_ready?).and_return(false)
        allow(subject).to receive(:assessment_history)

        expect(subject.ready?).to eq(false)
      end

      it 'is true if all conditions are true' do
        subject = make_subject(user)
        allow(subject).to receive(:latest_assessment_new?).and_return(true)
        allow(subject).to receive(:any_assessments?).and_return(true)
        allow(subject).to receive(:assessment_results_ready?).and_return(true)
        allow(subject).to receive(:assessment_history)

        expect(subject.ready?).to eq(true)
      end
    end
  end
end
