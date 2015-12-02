module AssessmentResults
  class Updating
    class UserAssessmentForWrongUser < RuntimeError; end

    attr_reader :user, :latest_mbs_user_assessment

    def initialize(user, latest_mbs_user_assessment)
      @user = user
      @latest_mbs_user_assessment = latest_mbs_user_assessment
      fail(UserAssessmentForWrongUser) unless assessment_belongs_to_user?
    end

    def update!(result_args = {})
      latest_mbs_user_assessment.update!(
        raw_results: result_args[:assessment_results],
        external_session_id: result_args[:assessment_session_name]
      )
    end

    private

    def assessment_belongs_to_user?
      user.user_assessments.include? latest_mbs_user_assessment
    end
  end
end
