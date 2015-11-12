class ImportContentItemJob < ActiveJob::Base
  queue_as :default

  # TODO: fix assignment too high error from rubocop
  def perform(content)
    json_payload =
      if content[:type] == 'article'
        Apis::CMS::Content
            .new(content[:url]).json_payload_with_type(content[:articleType])
      else
        Apis::CMS::Content.new(content[:url]).json_payload
      end

    hash = process_json(content[:type]).new(json_payload).convert_content

    ImportContent::Persist
      .new(hash, resource(content[:type]), article_type(json_payload))
      .create_or_update
  end

  private

  def process_json(content_type)
    case content_type
    when 'article' then ImportContent::ProcessArticleJson
    when 'activity' then ImportContent::ProcessActivityJson
    when 'game' then ImportContent::ProcessGameJson
    when 'recipe' then ImportContent::ProcessRecipeJson
    end
  end

  def resource(content_type)
    case content_type
    when 'article' then Article
    when 'activity' then Activity
    when 'game' then Game
    when 'recipe' then Recipe
    end
  end

  def article_type(json_payload)
    # TODO: change type options to match final api
    case json_payload['articleType']
    when 'slideshow' then SlideshowArticle
    when 'video' then VideoArticle
    when 'basic' then BasicArticle
    end
  end
end
