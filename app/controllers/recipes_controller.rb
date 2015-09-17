class RecipesController < ApplicationController
  def index
    # TODO: consider pulling into a shared base controller for Recipes,
    # Activities, etc
    @collection = present(filtered_recipes)
    set_surrogate_key_header Recipe.table_key, @collection.map(&:record_key)
    flash[:explanation] = I18n.t('explanation.recipes')
  end

  def show; end

  private

  def present(recipes)
    Presenter.present_all(recipes, roles: [Roles::AsCard])
  end

  def filtered_recipes
    PillarFiltering.new(Recipe.all, params).paginated_collection
  end
end
