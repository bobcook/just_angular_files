module Apis
  module CMS
    class LatestContentFeed
      def import
        content_list.each do |item|
          url = "#{ENV.fetch('CMS_BASE_URL')}#{item['pagePath']}"
          ImportContentItemJob.perform_later(url: url)
        end
      end

      private

      def content_list
        @content_list ||= ContentList.new.fetch
      end
    end
  end
end
