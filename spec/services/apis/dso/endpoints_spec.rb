require 'rails_helper'

module Apis
  module DSO
    describe Endpoints do
      def make_subject(double = nil, token_cache = nil)
        Endpoints.new(http: double, token_cache: token_cache)
      end

      describe '#token' do
        it 'hits the correct endpoint' do
          expected_url =
            'https://services.share.aarp.org/applications/CoreServices/' \
            'WSOWebService/providers/ShareCare/token'
          http = double
          crypto = double(authentication_header: '', signature_header: '')
          subject = make_subject(http)

          allow(subject).to receive(:http).and_return(http)
          allow(subject).to receive(:make_response)
          allow(subject).to receive(:crypto).and_return(crypto)
          expect(http).to receive(:post).with(expected_url, anything, anything)

          subject.token
        end

        it 'returns an ok status', integration: true do
          expect(make_subject.token.ok?).to eq(true)
        end
      end

      describe '#login_from_provider' do
        it 'hits the correct endpoint' do
          expected_url =
            'https://services.share.aarp.org/applications/CoreServices/' \
            'WSOWebService/users/session'
          http = double
          token_cache = double
          subject = make_subject(http, token_cache)

          allow(subject).to receive(:http).and_return(http)
          allow(subject).to receive(:token_cache).and_return(token_cache)
          allow(subject).to receive(:make_response)
          allow(token_cache).to receive(:with_provider_token).and_yield('123')
          expect(http).to receive(:get).with(expected_url, anything, anything)

          subject.login_from_provider
        end
      end

      describe '#user' do
        it 'hits the correct endpoint' do
          token = '123456789'
          expected_url =
            'https://services.share.aarp.org/applications/CoreServices/' \
            'WSOWebService/users/' + token
          http = double
          token_cache = double
          subject = make_subject(http, token_cache)

          allow(subject).to receive(:http).and_return(http)
          allow(subject).to receive(:make_response)
          allow(subject).to receive(:token_cache).and_return(token_cache)
          allow(token_cache).to receive(:with_provider_token).and_yield(token)
          expect(http).to receive(:get).with(expected_url, anything, anything)

          subject.user(token)
        end
      end

      describe '#logout' do
        it 'hits the correct endpoint' do
          token = '12345'
          expected_url =
            'https://services.share.aarp.org/applications/CoreServices/' \
            'WSOWebService/users/' + token + '/session'
          http = double
          token_cache = double
          subject = make_subject(http, token_cache)

          allow(subject).to receive(:http).and_return(http)
          allow(subject).to receive(:make_response)
          allow(subject).to receive(:token_cache).and_return(token_cache)
          allow(token_cache).to receive(:with_provider_token).and_yield(token)
          expect(http).to receive(:delete)
            .with(expected_url, anything, anything)

          subject.logout(token)
        end
      end
    end
  end
end
