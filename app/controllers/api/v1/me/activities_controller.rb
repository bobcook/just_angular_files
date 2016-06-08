module Api
  module V1
    module Me
      class ActivitiesController < Api::V1::Me::BaseController
        include SaveableResource
        include PaginatedResource

        MAX_ACTIVITIES_COUNT = 6 # TODO: move elsewhere

        def index
          records = current_user.user_activities.where(archived: false)
          render json: records, status: :ok
        end

        def update
          instance.update(archived: archived)
          render json: instance, serializer: serializer, status: :ok
        end

        def create
          if user_at_max_activities?
            head :no_content
          else
            user_activity = resource.create(activity: instance_to_save)
            if engagement_email.update_activity_status?
              engagement_email.send_later
            end
            render json: user_activity, serializer: serializer, status: :created
          end
        end

        private

        def archived
          params[:activity][:archived]
        end

        def user_at_max_activities?
          current_user.user_activities.where(archived: false).count >=
            MAX_ACTIVITIES_COUNT
        end

        def instance
          @instance ||=
            resource
            .includes(activity: :pillars)
            .find_by(activity_id: params[:id])
        end

        def instance_to_save
          @instance_to_save ||=
            Activity.friendly.find(params[:activity][:activity_id])
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

        def engagement_email
          EngagementEmails.new(current_user)
        end
      end
    end
  end
end
