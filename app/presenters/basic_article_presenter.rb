class BasicArticlePresenter < ArticlePresenter
  def text(segment)
    segment['ShortText']
  end

  def image?(segment)
    segment['imageBrowse'].present?
  end

  def image(segment)
    segment['imageBrowse']
  end

  def image_caption(segment)
    segment['caption']
  end

  def image_position(segment)
    segment['ImagePosition']
  end

  def content
    return [] if content_container.nil?
    content_container.select { |key| key =~ /^textimage/ }.values
  end

  private

  def content_container
    article['content']['columns_body']['pageColumnMain']['article']\
      ['ContentParsys']
  rescue NoMethodError, TypeError
    nil
  end
end
