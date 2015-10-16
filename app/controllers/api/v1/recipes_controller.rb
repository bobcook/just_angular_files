module Api
  module V1
    class RecipesController < Api::V1::PaginatedResourceController
      private

      def resource
        Recipe
      end

      def serializer
        RecipeSerializer
      end
    end
  end
end
