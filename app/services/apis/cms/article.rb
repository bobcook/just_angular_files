module Apis
  module CMS
    class Article
      attr_reader :api_url

      def initialize(api_url)
        @api_url = api_url
      end

      def json_payload
        response = Faraday.get(api_url)
        JSON.parse(response.body)
      end

      # NOTE: temporary method to add type to article json because the json
      # doesn't include type. Hopefully in the finalized api, type is included,
      # and we can just use json_payload
      def json_payload_with_type(type)
        json_with_type = json_payload
        json_with_type[:type] = type
        json_with_type
      end
    end
  end
end