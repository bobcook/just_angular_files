require 'rails_helper'

module Apis
  module DSO
    describe ProviderTokenCache do
      describe '#with_provider_token' do
        before(:each) do
          Rails.cache.clear
        end

        def make_subject(api)
          ProviderTokenCache.new(api)
        end

        it 'calls api#provider_token_header when the token is not cached' do
          api = double
          subject = make_subject(api)
          expect(api).to receive(:provider_token_header).and_return('123')

          result = subject.with_provider_token do |_token|
            Response.new(status: 200)
          end
          expect(result.ok?).to eq(true)
        end

        it 'does not call api#provider_token_header when the token is cached' do
          api = double
          subject = make_subject(api)
          Rails.cache.write(subject.class.cache_key, 'already exists')

          expect(api).not_to receive(:provider_token_header)

          result = subject.with_provider_token do |_token|
            Response.new(status: 200)
          end
          expect(result.ok?).to eq(true)
        end

        it 'calls api#provider_token_header when response is unauthorized' do
          api = double
          subject = make_subject(api)
          Rails.cache.write(subject.class.cache_key, 'already exists')

          # First two times (with bad token) are unauthorized, third time works
          allow(api).to receive(:dummy_api_call)
            .and_return(
              Response.new(status: 401),
              Response.new(status: 200)
            )

          # For first two calls to API
          expect(api).to receive(:provider_token_header)

          expect(api).to receive(:dummy_api_call).exactly(2).times

          result = subject.with_provider_token do |token|
            api.dummy_api_call(provider_token: token)
          end

          expect(result.ok?).to eq(true)
        end

        it 'throws ProviderTokenInaccessibleError when MAX_RETRIES reached' do
          api = double
          subject = make_subject(api)

          allow(api).to receive(:dummy_api_call)
            .and_return(
              Response.new(status: 401),
              Response.new(status: 401),
              Response.new(status: 401)
            )

          allow(api).to receive(:provider_token_header)

          expect do
            subject.with_provider_token do |token|
              api.dummy_api_call(provider_token: token)
            end
          end.to raise_error(ProviderTokenCache::ProviderTokenInaccessibleError)
        end
      end
    end
  end
end
