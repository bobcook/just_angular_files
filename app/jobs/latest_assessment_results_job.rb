class LatestAssessmentResultsJob < ActiveJob::Base
  queue_as :default

  class IncompleteMBSResults < RuntimeError; end

  # Leverages sidekiq's 'automatic job retries' when exceptions are thrown
  # to wait for results from MBS if they aren't ready yet.
  #
  # First retry after ~15 seconds, then 16, 31, ...
  #
  # See:
  # https://github.com/mperham/sidekiq/wiki/Error-Handling#automatic-job-retry
  def perform(user, user_assessment)
    latest = latest_results_for(user)

    if latest.ready?
      update_latest_user_assessment_for(
        user,
        user_assessment,
        assessment_session_name: latest.assessment_session_name,
        assessment_results: latest.assessment_results.try(:results_data)
      )
    else
      fail IncompleteMBSResults
    end
  end

  private

  def latest_results_for(user)
    AssessmentResults::Latest.new(user)
  end

  def update_latest_user_assessment_for(user, user_assessment, result_args)
    AssessmentResults::Updating.new(user, user_assessment).update!(result_args)
  end
end
