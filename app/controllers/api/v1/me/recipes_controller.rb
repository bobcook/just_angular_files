module Api
  module V1
    module Me
      class RecipesController < Api::V1::Me::BaseController
        include PaginatedResource
        include SaveableResource

        private

        def resource
          current_user.recipes
        end

        def serializer
          RecipeSerializer
        end

        def saveable_resource_type
          Recipe
        end
      end
    end
  end
end
