module Api
  module V1
    module Me
      class ArchivedActivitiesController < Api::V1::Me::BaseController
        def index
          records = current_user.user_activities.where(archived: true)
          render json: records, status: :ok
        end
      end
    end
  end
end
