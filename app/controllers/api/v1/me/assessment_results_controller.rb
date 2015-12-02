module Api
  module V1
    module Me
      class AssessmentResultsController < Api::V1::Me::BaseController
        def create
          user_assessment =
            current_user
            .user_assessments
            .find_by!(id: create_params[:user_assessment_id])

          LatestAssessmentResultsJob
            .perform_later(current_user, user_assessment)

          head :ok
        end

        private

        def create_params
          params.require(:assessment_result).permit(:user_assessment_id)
        end
      end
    end
  end
end
