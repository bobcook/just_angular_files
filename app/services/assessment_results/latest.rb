module AssessmentResults
  class Latest
    attr_reader :user

    def initialize(user)
      @user = user
    end

    def ready?
      any_assessments? && latest_assessment_new? && assessment_results_ready?
    end

    def assessment_session_name
      assessment_history.latest_session_name
    end

    def assessment_results
      @assessment_results ||= begin
        results_data = mbs_api.assessment_result(user, assessment_num)
        Apis::MBS::AssessmentResults.from_results_data(results_data)
      end
    end

    private

    def assessment_num
      @assessment_num ||= assessment_history.latest_assessment_num
    end

    def assessment_results_ready?
      assessment_results.any_content?
    end

    def any_assessments?
      assessment_history.any_assessments?
    end

    def latest_assessment_new?
      !assessment_history.latest_assessment_num_in(user_assessment_session_ids)
    end

    def user_assessment_session_ids
      @user_assessment_session_ids ||= user.user_assessments.map(&:session_id)
    end

    def assessment_history
      @assessment_history ||= begin
        all_assessment_data = mbs_api.all_assessments(user)
        Apis::MBS::HistoricIndex.from_assessment_data(all_assessment_data)
      end
    end

    def mbs_api
      @mbs_api ||= Apis::MBS.endpoints
    end
  end
end
