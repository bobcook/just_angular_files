module Api
  module V1
    module Me
      module AssessmentResults
        # TODO: refactor out common logic between controllers
        class UserInfoController < Api::V1::Me::BaseController
          def show
            return unauthorized unless user_assessment_group.present?
            respond_with user_info, serializer: UserInfoSerializer
          end

          private

          def user_info
            @user_info ||= Lifestyle::UserInfo.new(user_assessment_group)
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
