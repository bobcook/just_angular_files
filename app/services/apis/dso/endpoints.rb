# DSO provides an API for SSO (Single Sign On).
# See /doc/SSO Web Service User Guide.doc for more detailed info
module Apis
  module DSO
    class Endpoints
      attr_reader :http, :token_cache

      ENDPOINTS = {
        get_token: '/providers/ShareCare/token',
        login_from_provider: '/users/session',
        user: '/users'
      }

      def initialize(options = {})
        @http = options[:http] || Faraday
        @token_cache = options[:token_cache] || ProviderTokenCache.new(self)
      end

      def provider_token_header
        token.headers[:provider_token]
      end

      def token
        headers = {
          'Authentication' => crypto.authentication_header,
          'Signature' => crypto.signature_header
        }

        raw_response = http.post(url(:get_token), {}, headers)
        make_response(raw_response)
      end

      def login_from_provider(options = {})
        with_provider_token do |token|
          referrer = options[:referrer] || login_callback_url
          headers = { 'Authentication' => token }
          params = { 'referrer' => referrer }

          http.get(url(:login_from_provider), params, headers)
        end
      end

      def user(user_token, _options = {})
        with_provider_token do |token|
          full_url = url(:user) + "/#{user_token}"
          headers = { 'Authentication' => token }

          http.get(full_url, {}, headers)
        end
      end

      private

      def with_provider_token(&block)
        token_cache.with_provider_token do |token|
          make_response(block.call(token))
        end
      end

      def login_callback_url
        # TODO
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
