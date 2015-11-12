module Apis
  module CMS
    class ImportContentItems
      def import
        recent_content_items.each do |item|
          ImportContentItemJob.perform_later(item)
        end
      end

      private

      def recent_content_items
        RecentContentItems.new.fetch
      end
    end
  end
end
