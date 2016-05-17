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

  def no_content_left?
    last_page_reached?(Game, game_count) &&
      last_page_reached?(Article, article_count) &&
      last_page_reached?(Recipe, recipe_count) &&
      last_page_reached?(Activity, activity_count)
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

  def page_offset(page_number, resource, per_page)
    return page_number if greater_than_last_page?(resource, per_page)
    (((page_number.to_i + Date.today.yday) %
      total_pages(resource, per_page)) + 1).to_s
  end

  def sorted_content(resource, per_page)
    resource
      .newest_first
      .maybe_for_pillar(pillar)
      .page(page_offset(page, resource, per_page))
      .per(per_page)
  end

  def total_pages(resource, per_page)
    resource.maybe_for_pillar(pillar).page(0).per(per_page).total_pages
  end

  def greater_than_last_page?(resource, per_page)
    page.to_i > total_pages(resource, per_page)
  end

  def last_page_reached?(resource, per_page)
    page.to_i >= total_pages(resource, per_page)
  end
end
