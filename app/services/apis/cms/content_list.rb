module Apis
  module CMS
    class ContentList
      include WithFaraday

      attr_reader :http

      def initialize(http: faraday)
        # @http = options[:http] || faraday
        @http = http
      end

      def fetch
        http.get(ENV.fetch('CMS_CONTENT_FEED_ENDPOINT')).body['listOfPages']
      end
    end
  end
end
