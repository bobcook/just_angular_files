module Apis
  module CMS
    class ContentFeeds
      CMS_BASE_URL = ENV.fetch('CMS_BASE_URL')
      CONTENT_TYPES = %w(activities games recipes articles)
      YEARS = %w(2015 2016)

      def fetch
        content_urls
      end

      private

      def content_urls
        YEARS.map do |year|
          CONTENT_TYPES.map do |type|
            { 'url': "#{CMS_BASE_URL}/#{type}/info-#{year}.infinity.json" }
          end
        end.flatten
      end
    end
  end
end
