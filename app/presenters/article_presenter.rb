class ArticlePresenter
  def initialize(article)
    @article = article
  end

  def title
    article['jcr:title']
  end

  def description
    article['jcr:description']
  end

  def author
    article['Author']
  end

  def date
    article['PrintDate'] || article['PublishDate']
  end

  def background_image_large
    article['ImageSize740']
  end

  def type
    article[:type]
  end

  private

  attr_reader :article
end
