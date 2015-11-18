class ImportContentItemJob < ActiveJob::Base
  queue_as :default

  # TODO: fix assignment too high error from rubocop
  def perform(content)
    json_payload = Apis::CMS::Content.new(content[:url]).json_payload
    hash =
      process_json(content_type(json_payload)).new(json_payload).convert_content

    ImportContent::Persist
      .new(
        hash, resource(content_type(json_payload)), article_type(json_payload)
      )
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

  def content_type(json_payload)
    json_payload[:content][0][:type]
  end

  def article_type(json_payload)
    # TODO: when api adds other article types, delete this conditional and
    #  use a case statement to select article type
    if json_payload[:content][0][:type] == 'article'
      BasicArticle
    end
  end
end
