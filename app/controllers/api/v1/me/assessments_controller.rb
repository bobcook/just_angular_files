module Api
  module V1
    module Me
      class AssessmentsController < Api::V1::Me::BaseController
        def show
          render json: user_asessment, status: :ok
        end

        def update
          user_asessment.update(assessment_params)
          render json: user_asessment, status: :ok
        end

        private

        def user_asessment
          UserAssessment.find(params[:id])
        end

        def assessment_params
          params[:user_assessment].permit(
            :id,
            :completed,
            :user_assessment_group_id,
            :assessment_id,
            :type
          )
        end
      end
    end
  end
end
