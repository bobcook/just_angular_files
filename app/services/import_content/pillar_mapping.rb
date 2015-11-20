# This exists because there is some uncertainty over the final displayed
# pillar names and the values entered into the CMS for associated pillars
module ImportContent
  module PillarMapping
    class << self
      delegate :slug_mapping, :name_mapping, :new_slug, :old_name, :new_name,
               to: :mapper

      def mapper
        @mapper ||= Mapper.new
      end
    end

    class Mapper
      include CollectionUtils

      def slug_mapping
        # old slug -> new slug
        {
          'keeping_fit' => 'move',
          'learning_more' => 'discover',
          'managing_stress' => 'relax',
          'eating_right' => 'nourish',
          'being_social' => 'connect'
        }
      end

      def name_mapping
        # old name -> new name
        @name_mapping ||= begin
          old_names = slug_names(slug_mapping.keys)
          new_names = slug_names(slug_mapping.values).map(&:upcase)

          zipmap(old_names, new_names)
        end
      end

      def new_slug(old_slug)
        slug_mapping[old_slug.to_s.downcase]
      end

      def new_name(old_name)
        name_mapping[old_name.to_s.titleize]
      end

      def old_name(name)
        name_mapping.invert[name.upcase] || name
      end

      private

      def slug_names(slugs)
        slugs.map(&method(:slug_to_name))
      end

      def slug_to_name(slug)
        slug.titleize
      end
    end
  end
end
