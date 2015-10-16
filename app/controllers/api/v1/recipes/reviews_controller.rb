module Api
  module V1
    module Recipes
      class ReviewsController < Api::V1::BaseController
        include ReviewableResource

        private

        def reviewable_resource_type
          Recipe
        end
      end
    end
  end
end
