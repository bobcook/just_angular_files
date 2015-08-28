module Apis
  module DSO
    class ProviderTokenCache
      attr_reader :api

      MAX_RETRIES = 3

      def self.cache_key
        'provider_token'
      end

      def initialize(api = Endpoints.new)
        @api = api
      end

      def with_provider_token(num_calls = 0, &block)
        raise_error if num_calls == MAX_RETRIES
        response = block.call(token) # Should return an Apis::Response

        if response.unauthorized?
          cache_new_token
          with_provider_token(num_calls + 1, &block)
        else
          response
        end
      end

      private

      def token
        @token ||= fetch_or { new_token } || cache_new_token
      end

      def new_token
        api.provider_token_header
      end

      def cache_new_token
        token_value = new_token
        Rails.cache.write(
          self.class.cache_key,
          token_value,
          expires_in: 1.day,
          race_condition_ttl: 10
        )
        token_value
      end

      def fetch_or(&block)
        Rails.cache.fetch(
          self.class.cache_key,
          expires_in: 1.day,
          race_condition_ttl: 10,
          &block
        )
      end

      def raise_error
        fail ProviderTokenInaccessibleError
      end

      class ProviderTokenInaccessibleError < RuntimeError; end
    end
  end
end
