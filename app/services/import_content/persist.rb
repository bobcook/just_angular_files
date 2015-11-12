module ImportContent
  class Persist
    def initialize(content_hash, resource, article_type = null)
      @content_hash = content_hash
      @resource = resource
      @article_type = article_type
    end

    def create_or_update
      # checking if url exists because current api doesn't have a unique
      # identifier for the articles
      content = resource.find_by(url: content_hash[:url])
      if content.present?
        update(content) if content.outdated?(content_hash[:last_modified])
      else
        create
      end
    end

    private

    attr_reader :content_hash, :resource, :article_type

    def create
      content = (article_type || resource).new(content_hash)
      content.purge_all if content.save!
    end

    def update(content)
      content.purge if content.update!(content_hash)
    end
  end
end
