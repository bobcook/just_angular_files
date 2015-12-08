module Api
  module V1
    module Me
      class AssessmentGroupsController < Api::V1::Me::BaseController
        def create
          last_group = create_user_assessment_group
          create_user_assessments(last_group)
          head :created
        end

        def index
          render json: current_user.user_assessment_groups, status: :ok
        end

        def update
          assessment_group.update_attributes(group_params)
          head :no_content
        end

        private

        def group_params
          params[:assessment_group].permit(
            :id,
            :completed
          )
        end

        def assessment_group
          UserAssessmentGroup.find(params[:id])
        end

        def create_user_assessment_group
          current_user.user_assessment_groups << UserAssessmentGroup.new
          UserAssessmentGroup.last
        end

        def create_user_assessments(last_group)
          Assessment.all.each do |assessment|
            UserAssessment.create(
              assessment: assessment,
              user: current_user,
              user_assessment_group: last_group,
              completed: false,
              order: assessment.order
            )
          end
        end
      end
    end
  end
end
