require 'rails_helper'

describe LatestAssessmentResultsJob, type: :job do
  include ActiveJob::TestHelper

  after do
    clear_enqueued_jobs
    clear_performed_jobs
  end

  describe '#perform' do
    let(:user) { build :user }

    let(:user_assessment) { build :user_assessment }

    let(:latest_assessment_results) do
      Hashie::Mash.new(
        ready?: true,
        assessment_session_name: 'expected name',
        assessment_results: assessment_results_data
      )
    end

    let(:assessment_results_data) do
      Hashie::Mash.new(results_data: { some: 'data' })
    end

    let(:assessment_results_updater) do
      double('assessment_results_updater', update!: true)
    end

    before(:each) do
      allow(AssessmentResults::Updating)
        .to receive(:new).and_return(assessment_results_updater)

      allow(AssessmentResults::Latest)
        .to receive(:new).and_return(latest_assessment_results)
    end

    context 'when the latest results are ready' do
      it 'updates the latest assesment for the given user' do
        name = latest_assessment_results.assessment_session_name
        results_data = assessment_results_data.results_data
        expected_hash = {
          assessment_session_name: name,
          assessment_results: results_data
        }

        expect(assessment_results_updater)
          .to receive(:update!).with(expected_hash)

        LatestAssessmentResultsJob.perform_now(user, user_assessment)
      end
    end

    context 'when there are retries left' do
      before(:each) do
        allow(latest_assessment_results)
          .to receive(:ready?).and_return(false)
      end

      it 'decrements the number of retries' do
        expect_any_instance_of(ActiveJob::ConfiguredJob)
          .to receive(:perform_later).with(user, user_assessment, 9)

        LatestAssessmentResultsJob.perform_now(
          user,
          user_assessment,
          retries: 10
        )
      end

      it 'schedules another retry in 30 seconds' do
        allow_any_instance_of(ActiveJob::ConfiguredJob)
          .to receive(:perform_later)

        expect(LatestAssessmentResultsJob)
          .to receive(:set).with(wait: 30.seconds).and_call_original

        LatestAssessmentResultsJob.perform_now(user, user_assessment)
      end
    end

    context 'when there are no retries left' do
      it 'raises IncompleteMBSResults' do
        allow(latest_assessment_results)
          .to receive(:ready?).and_return(false)

        expect do
          LatestAssessmentResultsJob.perform_now(
            user,
            user_assessment,
            retries: 0
          )
        end.to raise_error(LatestAssessmentResultsJob::IncompleteMBSResults)
      end
    end
  end
end
