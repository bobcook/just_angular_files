module ImportContent
  class Importer
    def initialize(raw_content_hash, content_class, article_type = nil)
      @cms_content = Persist::CMSContent.new(raw_content_hash)
      @content_class = content_class
      @article_type = article_type
    end

    def import
      # checking if url exists because current api doesn't have a unique
      # identifier for the articles
      content = find_existing_content(content_class)
      if content.present?
        update(content) if outdated?(content)
      else
        content = (article_type || content_class).new(cms_content.content_hash)
        create(content)
      end
    end

    private

    attr_reader :cms_content, :content_class, :article_type

    def outdated?(content)
      return true unless can_check_outdated?(content)
      content.outdated?(cms_content.last_modified)
    end

    def can_check_outdated?(content)
      content.last_modified.present? && cms_content.last_modified.present?
    end

    def create(content)
      content.purge_all if content.save!

      return unless cms_content.any_pillar_names?
      create_pillars(content)
      create_recommendations(content)
    end

    def update(content)
      content.purge if content.update!(cms_content.content_hash)

      return unless cms_content.any_pillar_names?
      update_pillars(content)
      update_recommendations(content)
    end

    def create_pillars(content)
      new_names = cms_content.pillar_names
      Persist::Pillars.new(content, new_names).create
    end

    def update_pillars(content)
      old_names = content.pillar_names
      new_names = cms_content.pillar_names
      Persist::Pillars.new(content, new_names, old_names).update
    end

    def create_recommendations(content)
      new_keywords = cms_content.keywords
      Persist::Recommendations.new(content, new_keywords).create
    end

    def update_recommendations(content)
      old_keywords = content.keywords
      new_keywords = cms_content.keywords
      Persist::Recommendations.new(content, new_keywords, old_keywords).update
    end

    def find_existing_content(content_class)
      content_class.find_by(slug: cms_content.slug)
    end
  end
end
