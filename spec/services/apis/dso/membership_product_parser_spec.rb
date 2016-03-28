require 'rails_helper'

module Apis
  module DSO
    describe MembershipProductParser do
      context 'given a parseable response' do
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
