module ImportContent
  module Persist
    class CMSContent
      attr_reader :raw_content_hash

      def initialize(raw_content_hash)
        @raw_content_hash = raw_content_hash
      end

      def content_hash
        @content_hash ||=
          raw_content_hash.select { |item| item != :brainHealthPillar }
          .merge(slug: slug)
      end

      def pillar_names
        @pillar_names ||=
          normalize_pillar_names(payload.fetch(:brainHealthPillar, []))
      end

      def any_pillar_names?
        @any_pillar_names ||= pillar_names.present?
      end

      def cms_url
        raw_content_hash[:cms_url]
      end

      def slug
        %r{/\d\d\/(.+)/}.match(raw_content_hash[:cms_url])[1]
      end

      def last_modified
        raw_content_hash[:last_modified]
      end

      def keywords
        @keywords ||= parse_keywords(payload.fetch(:keywords, []))
      end

      private

      def payload
        @payload ||= raw_content_hash.fetch(:payload, {})
      end

      def parse_keywords(keywords)
        ImportContent::Parse::DelimitedString.from(keywords)
      end

      def normalize_pillar_names(names_and_display_names)
        names_and_display_names.map do |name|
          pillar_mapper.old_name(name)
        end
      end

      def pillar_mapper
        @pillar_mapper ||= ImportContent::PillarMapping
      end
    end
  end
end
