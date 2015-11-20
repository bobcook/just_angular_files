module ImportContent
  class Persist
    def initialize(raw_content_hash, content_class, article_type = nil)
      @pillar_queries = PillarQueries.new
      @cms_content = CMSContent.new(raw_content_hash)
      @content_class = content_class
      @article_type = article_type
    end

    def import
      # checking if url exists because current api doesn't have a unique
      # identifier for the articles
      content = find_existing_content(content_class)
      if content.present?
        update(content) if content.outdated?(cms_content.last_modified)
      else
        content = (article_type || content_class).new(cms_content.content_hash)
        create(content)
      end
    end

    private

    attr_reader :cms_content, :content_class, :article_type, :pillar_queries

    def create(content)
      content.purge_all if content.save!

      return unless cms_content.any_pillar_names?
      cms_content.pillar_names.each do |cms_pillar_name|
        add_pillar(content, cms_pillar_name)
      end
    end

    def update(content)
      content.purge if content.update!(cms_content.content_hash)

      return unless cms_content.any_pillar_names?
      update_deleted_pillars(content)
      update_new_pillars(content)
    end

    def add_pillar(content, cms_pillar_name)
      pillar = pillar_queries.find_pillar(cms_pillar_name)

      return unless pillar_queries.can_add?(content, pillar)
      content.pillars << pillar
    end

    def update_deleted_pillars(content)
      pillar_queries.pillar_categorizations_for(content).each do |cat|
        cat.destroy unless cms_content.given_pillar_name?(cat.pillar_name)
      end
    end

    def update_new_pillars(content)
      pillar_names = cms_content.pillar_names
      pillar_queries.names_to_add(pillar_names, content).each do |pillar_name|
        add_pillar(content, pillar_name)
      end
    end

    def find_existing_content(content_class)
      content_class.find_by(cms_url: cms_content.cms_url)
    end

    class CMSContent
      attr_reader :raw_content_hash

      def initialize(raw_content_hash)
        @raw_content_hash = raw_content_hash
      end

      def content_hash
        @content_hash ||=
          raw_content_hash.select { |item| item != :brainHealthPillar }
      end

      def pillar_names
        @pillar_names ||= raw_content_hash[:payload][:brainHealthPillar]
      end

      def any_pillar_names?
        @any_pillar_names ||= pillar_names.present?
      end

      def given_pillar_name?(pillar_name)
        pillar_names.include?(pillar_name)
      end

      def cms_url
        raw_content_hash[:cms_url]
      end

      def last_modified
        raw_content_hash[:last_modified]
      end
    end

    class PillarQueries
      def find_pillar(name_or_display_name)
        Pillar.where(
          'pillars.name = :name OR pillars.display_name = :display_name',
          name: name_or_display_name,
          display_name: name_or_display_name
        ).first
      end

      def pillar_categorizations_for(content)
        PillarCategorization.where(categorizable: content)
      end

      def names_to_add(cms_pillar_names, content)
        normalized_cms_pillar_names = normalize_pillar_names(cms_pillar_names)
        normalized_cms_pillar_names - names_for(content)
      end

      def can_add?(content, pillar)
        pillar.present? && new_pillar?(content, pillar)
      end

      private

      def normalize_pillar_names(names_and_display_names)
        names_and_display_names.map(&method(:normalize_pillar_name)).uniq
      end

      def normalize_pillar_name(name_or_display_name)
        mapper.old_name(name_or_display_name)
      end

      def new_pillar?(content, pillar)
        !content.pillars.include?(pillar)
      end

      def names_for(content)
        pillar_categorizations_for(content)
          .includes(:pillar)
          .map(&:pillar)
          .map(&:name)
      end

      def mapper
        @mapper ||= PillarMapping
      end
    end
  end
end
