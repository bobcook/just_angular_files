module Api
  module V1
    module Me
      class ActivitiesController < Api::V1::Me::BaseController
        include PaginatedResource
        include SaveableResource

        private

        def resource
          @resource ||= current_user.activities
        end

        def sorted_collection
          @sorted_collection ||=
            resource.order('user_activities.created_at DESC')
        end

        def serializer
          ActivitySerializer
        end

        def saveable_resource_type
          Activity
        end
      end
    end
  end
end
