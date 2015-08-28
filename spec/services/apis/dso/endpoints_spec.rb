require 'rails_helper'

module Apis
  module DSO
    describe Endpoints do
      def make_subject(double = nil)
        Endpoints.new(http: double)
      end

      describe '#token' do
        it 'hits the correct endpoint' do
          expected_url =
            'https://services.share.aarp.org/applications/CoreServices/' \
            'WSOWebService/providers/ShareCare/token'
          http = double
          subject = make_subject(http)

          allow(subject).to receive(:http).and_return(http)
          allow(subject).to receive(:make_response)
          expect(http).to receive(:post).with(expected_url)

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
          subject = make_subject(http)

          allow(subject).to receive(:http).and_return(http)
          allow(subject).to receive(:make_response)
          expect(http).to receive(:get).with(expected_url)

          subject.login_from_provider
        end
      end

      describe '#user' do
        it 'hits the correct endpoint' do
          expected_user_token = '123456789'
          expected_url =
            'https://services.share.aarp.org/applications/CoreServices/' \
            'WSOWebService/users/' + expected_user_token
          http = double
          subject = make_subject(http)

          allow(subject).to receive(:http).and_return(http)
          allow(subject).to receive(:make_response)
          expect(http).to receive(:get).with(expected_url)

          subject.user(expected_user_token)
        end
      end
    end
  end
end
