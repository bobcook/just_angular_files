module ImportContent
  class Persist
    def initialize(content_hash, resource, article_type = nil)
      @content_hash = content_hash
      @resource = resource
      @article_type = article_type
    end

    def create_or_update
      # checking if url exists because current api doesn't have a unique
      # identifier for the articles
      content = resource.find_by(cms_url: content_hash[:cms_url])
      if content.present?
        update(content) if content.outdated?(content_hash[:last_modified])
      else
        create
      end
    end

    private

    attr_reader :content_hash, :resource, :article_type, :content

    def create
      @content = (article_type || resource).new(article_hash)
      content.purge_all if content.save!

      return if cms_pillars.blank?
      cms_pillars.each do |cms_pillar|
        add_pillar(cms_pillar)
      end
    end

    def article_hash
      content_hash.select { |item| item != :brainHealthPillar }
    end

    def update(content)
      @content = content
      content.purge if content.update!(article_hash)

      return if cms_pillars.blank?
      update_deleted_pillars
      update_new_pillars
    end

    def cms_pillars
      content_hash[:payload][:brainHealthPillar]
    end

    def pillars_for_content
      @pillars_for_content ||=
        PillarCategorization.where(categorizable: content)
    end

    def pillar_names_for_content
      @pillar_names_for_content ||=
        pillars_for_content.includes(:pillar).pluck(:name)
    end

    def add_pillar(cms_pillar)
      pillar = Pillar.find_by(name: cms_pillar)
      return if pillar.blank?
      content.pillars << pillar
    end

    def update_deleted_pillars
      pillars_for_content.each do |pillar|
        pillar.destroy unless cms_pillars.include?(pillar.pillar.name)
      end
    end

    def update_new_pillars
      (cms_pillars - pillar_names_for_content).each do |cms_pillar|
        add_pillar(cms_pillar)
      end
    end
  end
end
