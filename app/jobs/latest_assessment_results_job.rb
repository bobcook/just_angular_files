class LatestAssessmentResultsJob < ActiveJob::Base
  queue_as :default

  class IncompleteMBSResults < RuntimeError; end

  def perform(user, user_assessment, retries: 20)
    latest = latest_results_for(user)

    if latest.ready?
      update_latest_user_assessment_for(
        user,
        user_assessment,
        assessment_session_name: latest.assessment_session_name,
        assessment_results: latest.assessment_results.try(:results_data)
      )
    elsif retries > 0
      schedule_retry(user, user_assessment, retries)
    else
      fail IncompleteMBSResults
    end
  end

  private

  def schedule_retry(user, user_assessment, retries)
    LatestAssessmentResultsJob
      .set(wait: 30.seconds)
      .perform_later(user, user_assessment, retries: retries - 1)
  end

  def latest_results_for(user)
    AssessmentResults::Latest.new(user)
  end

  def update_latest_user_assessment_for(user, user_assessment, result_args)
    AssessmentResults::Updating.new(user, user_assessment).update!(result_args)
  end
end
