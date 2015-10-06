module Api
  module V1
    module Me
      class UserActivitiesController < Api::V1::Me::BaseController
        def show
          user_activity = current_user.user_activities.find params[:id]
          render json: user_activity, serializer: UserActivitySerializer
        end
      end
    end
  end
end
