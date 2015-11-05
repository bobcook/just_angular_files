module Api
  module V1
    module Games
      class ReviewsController < Api::V1::BaseController
        include ReviewableResource

        private

        def reviewable_resource_type
          Game
        end
      end
    end
  end
end
