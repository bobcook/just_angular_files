module Api
  module V1
    class ActivitiesController < Api::V1::BaseController
      include PaginatedResource

      private

      def resource
        Activity
      end

      def serializer
        ActivitySerializer
      end
    end
  end
end
