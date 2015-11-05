module Api
  module V1
    module Activities
      class ReviewsController < Api::V1::BaseController
        include ReviewableResource

        private

        def reviewable_resource_type
          Activity
        end
      end
    end
  end
end
