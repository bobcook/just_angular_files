require 'rails_helper'

module Apis
  module DSO
    describe MembershipProductParser do
      context 'given a parseable response' do
        context 'given one membership type' do
          it 'gives correct type when given employee' do
            response = Apis::Response.new(
              status: 200,
              body: {
                getSpecializedMembershipStatus: {
                  specializedMembershipStatusList: {
                    specializedMembershipStatus: {
                      membershipProduct: 'Specialized Membership - $0 Employee'
                    }
                  }
                }
              }
            )

            expect(MembershipProductParser.parse(response)).to eq('employee')
          end

          it 'gives correct type when given beta' do
            response = Apis::Response.new(
              status: 200,
              body: {
                getSpecializedMembershipStatus: {
                  specializedMembershipStatusList: {
                    specializedMembershipStatus: {
                      membershipProduct: 'Specialized Membership - $0 BETA'
                    }
                  }
                }
              }
            )

            expect(MembershipProductParser.parse(response)).to eq('beta')
          end
        end

        context 'given multiple membership types' do
          response = Apis::Response.new(
            status: 200,
            body: {
              getSpecializedMembershipStatus: {
                specializedMembershipStatusList: {
                  specializedMembershipStatus: [
                    {
                      membershipType: 'StayingSharp',
                      membershipProduct: 'Specialized Membership - $0 BETA'
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
            expect(MembershipProductParser.parse(response)).to eq('beta')
          end
        end
      end

      context 'given a non-200 response' do
        let(:response) { Apis::Response.new(status: 401, body: {}) }

        it 'gives an UnknownProduct' do
          expect { MembershipProductParser.parse(response) }
            .to raise_error(MembershipProductParser::UnknownProduct)
        end
      end
    end
  end
end
