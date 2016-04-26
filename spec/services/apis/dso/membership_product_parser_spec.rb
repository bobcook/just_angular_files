require 'rails_helper'

module Apis
  module DSO
    describe MembershipProductParser do
      context 'given a parseable response' do
        it 'returns membership product' do
          membership_product = 'Staying Sharp - $5.99/Month'
          response = Apis::Response.new(
            status: 200,
            body: {
              getSpecializedMembershipStatus: {
                specializedMembershipStatusList: {
                  specializedMembershipStatus: {
                    membershipProduct: membership_product
                  }
                }
              }
            }
          )

          expect(MembershipProductParser.parse(response)).to eq(
            membership_product
          )
        end

        context 'given multiple membership types' do
          membership_product = 'Specialized Membership - $0 BETA'
          response = Apis::Response.new(
            status: 200,
            body: {
              getSpecializedMembershipStatus: {
                specializedMembershipStatusList: {
                  specializedMembershipStatus: [
                    {
                      membershipType: 'StayingSharp',
                      membershipProduct: membership_product
                    },
                    {
                      membershipType: 'Not StayingSharp',
                      membershipProduct: 'not StayingSharp product'
                    }
                  ]
                }
              }
            }
          )

          it 'gives correct type' do
            expect(MembershipProductParser.parse(response)).to eq(
              membership_product
            )
          end
        end
      end

      context 'given a non-200 response' do
        let(:response) { Apis::Response.new(status: 401, body: {}) }

        it 'gives an error' do
          expect { MembershipProductParser.parse(response) }
            .to raise_error(DSO::BadDSOResponse)
        end
      end
    end
  end
end
