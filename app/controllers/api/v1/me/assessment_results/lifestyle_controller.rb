module Api
  module V1
    module Me
      module AssessmentResults
        # TODO: refactor common parts from NeuroPerformanceController
        class LifestyleController < Api::V1::Me::BaseController
          def show
            return unauthorized unless user_assessment_group.present?
            respond_with(
              lifestyle_results,
              each_serializer: LifestyleResultSerializer
            )
          end

          private

          def lifestyle_results
            @lifestyle_results ||=
              ::AssessmentResults::AssessmentGroupResults.new(
                current_user,
                user_assessment_group
              ).lifestyle
          end

          def unauthorized
            render json: {}, status: :unauthorized
          end

          def user_assessment_group
            @user_assessment_group ||=
              current_user
              .user_assessment_groups
              .find_by(id: params[:assessment_result_id])
          end
        end
      end
    end
  end
end
