module Api
  module V1
    class ActivitiesController < Api::V1::BaseController
      def show
        render json: Activity.find(params[:id]), serializer: ActivitySerializer
      end
    end
  end
end
