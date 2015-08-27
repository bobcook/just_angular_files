class ArticlePresenter
  delegate :id, :title, :slideshow?, :video?, :basic?, to: :article

  def initialize(article)
    @article = article
  end

  def description
    article.payload['jcr:description']
  end

  def author
    article.payload['Author']
  end

  def date
    article.publish_date
  end

  def background_image_large
    article.payload['ImageSize740']
  end

  private

  attr_reader :article
end
