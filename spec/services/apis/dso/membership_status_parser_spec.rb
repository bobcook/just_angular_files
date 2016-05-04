require 'rails_helper'

module Apis
  module DSO
    describe MembershipStatusParser do
      describe '.for_response' do
        def make_subject(response)
          MembershipStatusParser.parse(response)
        end

        context 'given parseable response' do
          context 'given one membershipType' do
            def make_response(status_str, status = 200)
              Apis::Response.new(
                status: status,
                body: {
                  getSpecializedMembershipStatus: {
                    specializedMembershipStatusList: {
                      specializedMembershipStatus: {
                        membershipStatus: status_str
                      }
                    }
                  }
                }
              )
            end

            it 'is the correct type when given "PROSPECT"' do
              response = make_response('PROSPECT')
              result = make_subject(response)

              expect(result.to_sym).to eq(:prospect)
            end
          end

          context 'given multiple membershipTypes' do
            response = Apis::Response.new(
              status: 200,
              body: {
                getSpecializedMembershipStatus: {
                  specializedMembershipStatusList: {
                    specializedMembershipStatus: [
                      {
                        membershipType: 'StayingSharp',
                        membershipStatus: 'PROSPECT'
                      },
                      {
                        membershipType: 'Not StayingSharp',
                        membershipStatus: 'not StayingSharp product'
                      }
                    ]
                  }
                }
              }
            )

            it 'is the correct type when given "PROSPECT"' do
              result = make_subject(response)

              expect(result.to_sym).to eq(:prospect)
            end
          end
        end

        context 'given non-200 response' do
          def make_response
            Apis::Response.new(
              status: 401,
              body: {
                getSpecializedMembershipStatus: {
                  specializedMembershipStatusList: {
                    specializedMembershipStatus: {
                      membershipStatus: 'PROSPECT'
                    }
                  }
                }
              }
            )
          end

          it 'gives an UnknownStatus' do
            response = make_response

            expect { make_subject(response) }
              .to raise_error(DSO::BadDSOResponse)
          end
        end

        context 'given unknown status string' do
          def make_response(status_str, status = 200)
            Apis::Response.new(
              status: status,
              body: {
                getSpecializedMembershipStatus: {
                  specializedMembershipStatusList: {
                    specializedMembershipStatus: {
                      membershipStatus: status_str
                    }
                  }
                }
              }
            )
          end

          it 'gives an error' do
            response = make_response('FOOBAR')

            expect { make_subject(response) }
              .to raise_error(MembershipStatusParser::UnknownStatus)
          end
        end

        context 'given malformed response' do
          def make_response(status = 200)
            Apis::Response.new(
              status: status,
              body: { bad: :key }
            )
          end

          it 'gives an UnknownStatus' do
            response = make_response

            expect { make_subject(response) }
              .to raise_error(MembershipStatusParser::UnknownStatus)
          end
        end
      end
    end
  end
end
