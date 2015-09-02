require 'rails_helper'
require_relative './endpoints_shared_examples'

module Apis
  module DSO
    describe Endpoints do
      def make_subject(double = nil, token_cache = nil)
        Endpoints.new(http: double, token_cache: token_cache)
      end

      describe '#token' do
        before do
          crypto = double(authentication_header: '', signature_header: '')
          allow(Crypto).to receive(:new).and_return(crypto)
        end

        it_behaves_like(
          'it hits the correct endpoint',
          verb: :post,
          endpoint: 'https://services.share.aarp.org/applications/' \
            'CoreServices/WSOWebService/providers/ShareCare/token',
          method: :token
        )

        it 'returns an ok status', integration: true do
          expect(make_subject.token.ok?).to eq(true)
        end
      end

      describe '#login_from_provider' do
        it_behaves_like(
          'it hits the correct endpoint',
          verb: :get,
          endpoint: 'https://services.share.aarp.org/applications/' \
                    'CoreServices/WSOWebService/users/session',
          method: :login_from_provider
        )
      end

      describe '#user' do
        it_behaves_like(
          'it hits the correct endpoint',
          verb: :get,
          endpoint: 'https://services.share.aarp.org/applications/' \
                    'CoreServices/WSOWebService/users/' + 'abc123',
          method: ->(subject) { subject.user('abc123') },
          token: 'abc123'
        )
      end

      describe '#logout' do
        it_behaves_like(
          'it hits the correct endpoint',
          verb: :delete,
          endpoint: 'https://services.share.aarp.org/applications/' \
                    'CoreServices/WSOWebService/users/' + '12345' + '/session',
          method: ->(subject) { subject.logout('12345') },
          token: '12345'
        )
      end

      describe '#membership_status' do
        it_behaves_like(
          'it hits the correct endpoint',
          verb: :get,
          endpoint: 'https://services.share.aarp.org/applications/' \
                    'CoreServices/WSOWebService/users/' + '12345' \
                    '/membershipStatus',
          method: ->(subject) { subject.membership_status('12345') },
          token: '12345'
        )
      end

      describe '#membership_info' do
        it_behaves_like(
          'it hits the correct endpoint',
          verb: :get,
          endpoint: 'https://services.share.aarp.org/applications/' \
                    'CoreServices/WSOWebService/users/' + '12345' \
                    '/membershipInfo',
          method: ->(subject) { subject.membership_info('12345') },
          token: '12345'
        )
      end

      describe '#specialized_membership_status' do
        it_behaves_like(
          'it hits the correct endpoint',
          verb: :get,
          endpoint: 'https://services.share.aarp.org/applications/' \
                    'CoreServices/WSOWebService/users/' + '12345' \
                    '/specializedMembershipStatus',
          method: lambda do |subject|
                    subject.specialized_membership_status('12345')
                  end,
          token: '12345'
        )
      end

      describe '#specialized_membership_info' do
        it_behaves_like(
          'it hits the correct endpoint',
          verb: :get,
          endpoint: 'https://services.share.aarp.org/applications/' \
                    'CoreServices/WSOWebService/users/' + '12345' \
                    '/specializedMembershipInfo',
          method: lambda do |subject|
                    subject.specialized_membership_info('12345')
                  end,
          token: '12345'
        )
      end
    end
  end
end
