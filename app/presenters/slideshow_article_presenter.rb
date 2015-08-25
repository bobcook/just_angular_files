class SlideshowArticlePresenter < ArticlePresenter
  def titles
    content_container['title']
  end

  def images
    content_container['img']
  end

  def credits
    content_container['credit']
  end

  private

  def content_container
    article['content']['columns_body_0']['pageColumnMain']['slideshow']\
      ['slides']
  rescue NoMethodError, TypeError
    {}
  end
end
