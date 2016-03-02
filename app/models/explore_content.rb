class ExploreContent
  RESOURCE_NAMES = %i(game article recipe activity)

  def initialize(params)
    @game_count = params[:games].to_i
    @free_game_count = params[:free_games].to_i
    @article_count = params[:articles].to_i
    @recipe_count = params[:recipes].to_i
    @activity_count = params[:activities].to_i
    @page = params[:page]
    @pillar = params[:pillar]
  end

  def all_last_page?
    games.last_page? &&
      articles.last_page? &&
      recipes.last_page? &&
      activities.last_page?
  end

  def games
    sorted_content(Game, game_count)
  end

  def free_games
    sorted_content(
      Game.where("payload ->> 'gameType'= 'Free'"),
      free_game_count
    )
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

  private

  attr_accessor :game_count, :free_game_count, :article_count, :recipe_count,
                :activity_count, :page, :pillar

  def sorted_content(resource, per_page)
    resource
      .newest_first
      .maybe_for_pillar(pillar)
      .page(page)
      .per(per_page)
  end
end
