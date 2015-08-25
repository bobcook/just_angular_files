# TODO: grab articles from database instead of connecting directly to AARP api
class ArticlesController < ApplicationController
  def index
    @articles = article_urls.map do |type, url|
      json_payload = json_payload(type, url)
      article_presenter(json_payload)
    end
  end

  def show
    url = article_urls[params[:type].to_sym]
    return redirect_to articles_path if url.blank?
    json_payload = json_payload(params[:type], url)
    @article = article_presenter(json_payload)
  end

  private

  def json_payload(type, url)
    Apis::CMS::Article.new(url).json_payload_with_type(type)
  end

  def article_presenter(json_payload)
    presenter = case params[:type]
                when 'Article::Slideshow' then SlideshowArticlePresenter
                else BasicArticlePresenter
                end
    presenter.new(json_payload)
  end

  def article_urls
    Apis::CMS::RecentArticles.new.fetch
  end
end
