module Api
  module V1
    module Me
      class UserActivitiesController < Api::V1::Me::BaseController
        def index
          user_activities = current_user.user_activities
          render json: user_activities
        end

        def show
          user_activities = current_user.user_activites.find(params[:id])
          render json: user_activities
        end
      end
    end
  end
end
