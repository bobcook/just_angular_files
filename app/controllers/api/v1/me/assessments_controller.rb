module Api
  module V1
    module Me
      class AssessmentsController < Api::V1::Me::BaseController
        def show
          render json: user_assessment, status: :ok
        end

        def update
          user_assessment.update(completed: assessment_params[:completed])
          if user_assessment.user_assessment_group.completed?
            engagement_email.send_later
          end

          render json: user_assessment, status: :ok
        end

        private

        def user_assessment
          UserAssessment.find(params[:id])
        end

        def assessment_params
          params[:user_assessment].permit(
            :id,
            :completed,
            :user_assessment_group_id,
            :assessment_id,
            :type,
            assessment: [
              :id,
              :name,
              :order,
              :created_at,
              :updated_at
            ]
          )
        end

        def engagement_email
          EngagementEmails.new(current_user)
        end
      end
    end
  end
end
