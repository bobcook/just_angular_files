module Apis
  module CMS
    class ContentFeed
      include WithFaraday

      attr_reader :api_url, :http

      def initialize(api_url, options = {})
        @api_url = api_url
        @http = options[:http] || faraday
      end

      def content_item_urls
        content_item_slugs.map do |slug|
          "#{base_url[:beginning]}/#{slug}/#{base_url[:ending]}"
        end
      end

      private

      def base_url
        {
          beginning: api_url.split('.infinity.json')[0],
          ending: '_jcr_content.ss.json'
        }
      end

      def content_item_slugs
        if response.ok?
          response.body.keys.reject { |key| key.start_with?('jcr') }
        else
          Airbrake.notify("No feed found for #{@api_url}")
          []
        end
      end

      def response
        @response ||= Apis::Response.from_faraday(http.get(api_url))
      end
    end
  end
end
