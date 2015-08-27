module ImportArticle
  class Persist
    def initialize(article_hash, article_type)
      @article_hash = article_hash
      @article_type = article_type
    end

    def create_or_update
      # checking if url exists because current api doesn't have a unique
      # identifier for the articles
      article = ::Article.find_by(url: article_hash[:url])
      if article.present?
        update(article) if article.outdated?(article_hash[:last_modified])
      else
        create
      end
    end

    private

    attr_reader :article_hash, :article_type

    def create
      article = article_type.new(article_hash)
      article.purge_all if article.save!
    end

    def update(article)
      article.purge if article.update!(article_hash)
    end
  end
end
