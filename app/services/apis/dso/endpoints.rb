# DSO provides an API for SSO (Single Sign On).
# See /doc/SSO Web Service User Guide.doc for more detailed info
module Apis
  module DSO
    class Endpoints
      attr_reader :provider_name, :http

      ENDPOINTS = {
        get_token: '/providers/ShareCare/token'
      }

      def initialize(options = {})
        @http = options[:http] || Faraday
      end

      def token
        raw_response = http.post(url(:get_token)) do |req|
          req.headers.merge!(
            'Authentication' => crypto.authentication_header,
            'Signature' => crypto.signature_header
          )
        end
        make_response(raw_response)
      end

      def headers
        {
          'Authentication' => crypto.authentication_header,
          'Signature' => crypto.signature_header
        }
      end

      private

      def make_response(faraday_response)
        Response.from_faraday(faraday_response)
      end

      def url(endpoint)
        base_url + ENDPOINTS.fetch(endpoint)
      end

      def base_url
        'https://services.share.aarp.org/applications/CoreServices/WSOWebService'
      end

      def crypto
        @crypto ||= Crypto.new
      end
    end
  end
end
