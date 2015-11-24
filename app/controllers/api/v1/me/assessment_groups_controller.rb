module Api
  module V1
    module Me
      class AssessmentGroupsController < Api::V1::BaseController
        def create
          last_group = create_user_assessment_group
          create_user_assessments(last_group)
          head :created
        end

        def index
          render json: current_user.user_assessment_groups, status: :ok
        end

        private

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
