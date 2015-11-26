module ImportContent
  module Persist
    class Pillars
      attr_reader :content, :old_pillar_names, :new_pillar_names

      def initialize(content, new_pillar_names, old_pillar_names = [])
        @content = content
        @old_pillar_names = old_pillar_names
        @new_pillar_names = new_pillar_names
      end

      def create
        add_new_items
      end

      def update
        remove_old_items
        add_new_items
      end

      private

      def add_new_items
        names_to_add = pillar_name_diff.to_add

        pillars(names_to_add).each do |pillar|
          create_pillar_categorization(pillar, content)
        end
      end

      def remove_old_items
        names_to_remove = pillar_name_diff.to_remove

        existing_categorizations(names_to_remove).each do |cat|
          destroy_categorization(cat)
        end
      end

      def destroy_categorization(pillar_categorization)
        pillar_categorization.destroy
      end

      def create_pillar_categorization(pillar, content)
        content.pillars << pillar
      end

      def pillar_name_diff
        @pillar_name_diff =
          ImportContent::Diff.new(old_pillar_names, new_pillar_names)
      end

      def existing_categorizations(pillar_names)
        content
          .pillar_categorizations
          .includes(:pillar)
          .where(pillars: { name: pillar_names })
      end

      def pillars(pillar_names)
        # TODO: see if can do this w/ just SQL
        pillar_names.map { |name| find_pillar(name) }
      end

      def find_pillar(name_or_display_name)
        Pillar.where(
          'pillars.name = :name OR pillars.display_name = :display_name',
          name: name_or_display_name,
          display_name: name_or_display_name
        ).first
      end
    end
  end
end
