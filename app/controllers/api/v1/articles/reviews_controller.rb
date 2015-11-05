module Api
  module V1
    module Articles
      class ReviewsController < Api::V1::BaseController
        include ReviewableResource

        private

        def reviewable_resource_type
          Article
        end
      end
    end
  end
end
