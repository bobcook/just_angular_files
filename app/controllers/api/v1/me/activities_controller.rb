module Api
  module V1
    module Me
      class ActivitiesController < Api::V1::Me::BaseController
        include PaginatedResource
        include SaveableResource

        def create
          user_activity = resource.create(activity: instance_to_save)

          render json: user_activity, serializer: serializer, status: :created
        end

        private

        def instance
          @instance ||=
            resource
            .includes(activity: :pillars)
            .find_by(activity_id: params[:id])
        end

        def instance_to_save
          @instance_to_save ||= Activity.find(params[:activity][:activity_id])
        end

        def resource
          @resource ||= current_user.user_activities
        end

        def sorted_collection
          @sorted_collection ||=
            resource.order('user_activities.created_at DESC')
        end

        def serializer
          UserActivitySerializer
        end

        def saveable_resource_type
          Activity
        end
      end
    end
  end
end