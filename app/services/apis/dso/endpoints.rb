# DSO provides an API for SSO (Single Sign On).
# See /doc/SSO Web Service User Guide.doc for more detailed info
module Apis
  module DSO
    class Endpoints
      attr_reader :http, :provider_token

      ENDPOINTS = {
        get_token: '/providers/ShareCare/token',
        login_from_provider: '/users/session',
        user: '/users'
      }

      def initialize(options = {})
        @http = options[:http] || Faraday

        # Don't default yet -- don't want to prematurely call #token
        @provider_token = options[:provider_token]
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

      def login_from_provider(options = {})
        referrer = options[:referrer] || login_callback_url

        raw_response = http.get(url(:login_from_provider)) do |req|
          req.params.merge!(
            'referrer' => referrer
          )
          req.headers.merge!(
            'Authentication' => provider_token
          )
        end
        make_response(raw_response)
      end

      def user(user_token, _options = {})
        full_url = url(:user) + "/#{user_token}"

        raw_response = http.get(full_url) do |req|
          req.headers.merge!(
            'Authentication' => provider_token
          )
        end
        make_response(raw_response)
      end

      private

      def login_callback_url
        # TODO
      end

      def provider_token
        # TODO: actual caching via Rails.cache
        @provider_token ||= token.headers[:provider_token]
      end

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
