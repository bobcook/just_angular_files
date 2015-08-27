class ArticlesController < ApplicationController
  before_action :set_cache_control_headers, only: [:index, :show]

  def index
    wip do
      # TODO: remove raw_articles when we get requirements about what to display
      raw_articles = Article.all
      @articles = raw_articles.map do |article|
        article_presenter(article)
      end
      set_surrogate_key_header Article.table_key, raw_articles.map(&:record_key)
    end
  end

  def show
    raw_article = Article.find(params[:id])
    @article = article_presenter(raw_article)
    set_surrogate_key_header raw_article.record_key
  end

  private

  def article_presenter(article)
    presenter = case article.type
                when 'SlideshowArticle' then SlideshowArticlePresenter
                else BasicArticlePresenter
                end
    presenter.new(article)
  end
end
