class ImportArticleJob < ActiveJob::Base
  queue_as :default

  def perform(article)
    json_payload = Apis::CMS::Article.new(article[:url])
                   .json_payload_with_type(article[:type])
    article_hash = ImportArticle::ProcessJson.new(json_payload).convert_article
    ImportArticle::Persist.new(article_hash, article_type(json_payload))
      .create_or_update
  end

  private

  def article_type(json_payload)
    # TODO: change type options to match final api
    case json_payload['type']
    when 'slideshow' then SlideshowArticle
    when 'video' then VideoArticle
    else BasicArticle
    end
  end
end
