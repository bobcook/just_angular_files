module Api
  module V1
    class RecipesController < Api::V1::BaseController
      def show
        recipe = Recipe.find_by(id: params[:id])
        options = { serializer: RecipeSerializer }

        recipe ? respond_with(recipe, options) : not_found
      end

      def index
        recipes = Recipe.newest_first.page(params[:page]).per(per_page)

        options = { each_serializer: RecipeSerializer }
        options.merge!(status: :partial_content) unless recipes.last_page?

        respond_with recipes, options
      end

      private

      def per_page
        params[:per_page] || I18n.t('config.pagination.per_page')
      end

      def not_found
        render json: { error: 'Recipe not found' }, status: :not_found
      end
    end
  end
end
