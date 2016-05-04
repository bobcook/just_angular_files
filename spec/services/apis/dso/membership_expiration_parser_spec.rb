require 'rails_helper'

module Apis
  module DSO
    describe MembershipExpirationParser do
      context 'given a parseable response' do
        context 'if there is a expiration' do
          it 'returns the expiration' do
            response = Apis::Response.new(
              status: 200,
              body: {
                getSpecializedMembershipStatus: {
                  specializedMembershipStatusList: {
                    specializedMembershipStatus: {
                      membershipExpirationDate: '2016-04-17'
                    }
                  }
                }
              }
            )
            target_date = DateTime.new(2016, 4, 17)

            expect(MembershipExpirationParser.parse(response)).to eq(
              target_date
            )
          end
        end

        context 'if there is no expiration' do
          it 'does not return expiration' do
            response = Apis::Response.new(
              status: 200,
              body: {
                getSpecializedMembershipStatus: {
                  specializedMembershipStatusList: {
                    specializedMembershipStatus: {}
                  }
                }
              }
            )

            expect(MembershipExpirationParser.parse(response)).to be_nil
          end
        end
      end

      context 'given a non parseable response' do
        let(:response) { Apis::Response.new(status: 401, body: {}) }

        it 'raises an error' do
          expect { MembershipExpirationParser.parse(response) }
            .to raise_error(DSO::BadDSOResponse)
        end
      end
    end
  end
end
