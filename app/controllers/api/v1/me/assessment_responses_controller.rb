module Api
  module V1
    module Me
      class AssessmentResponsesController < Api::V1::Me::BaseController
        def create
          AssessmentResponse.create(response_params)
          head :created
        end

        def index
          assessment_response = AssessmentResponse.where(
            user_assessment_id: params[:user_assessment_id],
            assessment_question_id: params[:assessment_question_id]
          )

          respond_with assessment_response
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
