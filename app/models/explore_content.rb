class ExploreContent
  def initialize(params)
    @game_count = params[:games].to_i
    @article_count = params[:articles].to_i
    @recipe_count = params[:recipes].to_i
    @activity_count = params[:activities].to_i
    @page = params[:page]
  end

  def all_last_page?
    games.last_page? &&
      articles.last_page? &&
      recipes.last_page? &&
      activities.last_page?
  end

  private

  attr_accessor :game_count, :article_count, :recipe_count, :activity_count,
                :page

  def games
    sorted_content(Game, game_count)
  end

  def articles
    sorted_content(Article, article_count)
  end

  def recipes
    sorted_content(Recipe, recipe_count)
  end

  def activities
    sorted_content(Activity, activity_count)
  end

  def sorted_content(resource, per_page)
    resource.newest_first.page(page).per(per_page)
  end
end