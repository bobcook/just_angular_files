module Api
  module V1
    module Me
      module AssessmentResults
        class NeuroPerformanceController < Api::V1::Me::BaseController
          def show
            return unauthorized unless user_assessment_group.present?
            respond_with neuro_results, each_serializer: NeuroResultSerializer
          end

          private

          def neuro_results
            @neuro_results ||=
              ::AssessmentResults::AssessmentGroupResults.new(
                current_user,
                user_assessment_group
              ).neuro
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
