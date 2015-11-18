module Apis
  module CMS
    class ImportContentFeeds
      def import
        content_feeds.each do |item|
          ImportContentFeedJob.perform_later(item)
        end
      end

      private

      def content_feeds
        ContentFeeds.new.fetch
      end
    end
  end
end
