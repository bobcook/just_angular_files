class ImportContentItemJob < ActiveJob::Base
  class EmptyCMSContent < RuntimeError; end

  queue_as :default

  # TODO: fix assignment too high error from rubocop
  def perform(content)
    json_payload = Apis::CMS::Content.new(content[:url]).json_payload
    fail(EmptyCMSContent) if json_payload.blank?
    hash =
      process_json(content_type(json_payload)).new(json_payload).convert_content

    importer = ImportContent::Importer.new(
      hash,
      resource(content_type(json_payload)),
      article_type(json_payload)
    )
    importer.import
  end

  private

  def process_json(content_type)
    case content_type
    when 'article' then ImportContent::ProcessArticleJson
    when 'activity' then ImportContent::ProcessActivityJson
    when 'game' then ImportContent::ProcessGameJson
    when 'recipe' then ImportContent::ProcessRecipeJson
    when 'video' then ImportContent::ProcessArticleJson
    end
  end

  def resource(content_type)
    case content_type
    when 'article' then Article
    when 'activity' then Activity
    when 'game' then Game
    when 'recipe' then Recipe
    when 'video' then Article
    end
  end

  def content_type(json_payload)
    json_payload[:content][0][:type]
  end

  def article_type(json_payload)
    case content_type(json_payload)
    when 'article' then BasicArticle
    when 'video' then VideoArticle
    end
  end
end
