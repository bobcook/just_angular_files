module Api
  module V1
    module Me
      class RecipesController < Api::V1::Me::BaseController
        include PaginatedResource
        include SaveableResource

        private

        def resource
          @resource ||= current_user.recipes
        end

        def sorted_collection
          @sorted_collection ||= resource.order('user_recipes.created_at DESC')
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
