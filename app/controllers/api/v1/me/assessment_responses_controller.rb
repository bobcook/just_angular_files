module Api
  module V1
    module Me
      class AssessmentResponsesController < Api::V1::Me::BaseController
        def create
          AssessmentResponse.create(response_params)
          head :created
        end

        private

        def response_params
          params[:assessment_response].permit(
            :assessment_question_id,
            :response,
            :user_assessment_id
          )
        end
      end
    end
  end
end
