module Api
  module V1
    module Me
      class AssessmentsController < Api::V1::Me::BaseController
        def show
          render json: user_asessment, status: :ok
        end

        def update
          user_asessment.update(assessment_params)
          if engagement_email.update_assessment_status?
            engagement_email.send_later
          end
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

        def engagement_email
          EngagementEmails.new(current_user)
        end
      end
    end
  end
end
