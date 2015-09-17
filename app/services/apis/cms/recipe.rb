module Apis
  module CMS
    class Recipe
      include WithFaraday

      attr_reader :http, :api_url

      def initialize(api_url, options = {})
        @api_url = api_url
        @http = options[:http] || faraday
      end

      def json_payload
        response.body
      end

      private

      def response
        @response ||=
          Apis::Response
          .from_faraday(http.get(api_url))
          .merge!(url: api_url)
      end
    end
  end
end
