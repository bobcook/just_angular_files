module Apis
  module CMS
    class Content
      include WithFaraday

      attr_reader :api_url, :http

      def initialize(api_url, options = {})
        @api_url = api_url
        @http = options[:http] || faraday
      end

      def json_payload
        normalize_pillars(response) if response_pillars
        response
          .merge!(cms_url: api_url).body
      end

      # NOTE: temporary method to add type to article json because the json
      # doesn't include type. Hopefully in the finalized api, type is included,
      # and we can just use json_payload
      def json_payload_with_type(article_type)
        json_with_type = json_payload
        json_with_type[:articleType] = article_type
        json_with_type
      end

      private

      def response
        @response ||= Apis::Response.from_faraday(http.get(api_url))
      end

      def normalize_pillars(response)
        normalized_pillars = normalize_string_array(response_pillars)
        response.body[:content][0][:brainHealthPillar] = normalized_pillars
      end

      def response_pillars
        response.body[:content][0][:brainHealthPillar]
      end

      # aarp cms returns a string if there is one item or an array if there
      # are multiple items
      def normalize_string_array(cms_items)
        if cms_items.class == String
          [cms_items]
        else
          cms_items
        end
      end
    end
  end
end
