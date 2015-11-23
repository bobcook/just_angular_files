require 'rails_helper'

module Apis
  module MBS
    describe Endpoints do
      def make_subject(double)
        Endpoints.new(http: double)
      end

      def make_user
        create(:user)
      end

      BASE_URL = ENV['MBS_API']

      describe '#last_assessment' do
        it 'GETs /GetLatestUserScore' do
          http = double
          subject = make_subject(http)
          user = make_user
          endpoint = "#{BASE_URL}/GetLatestUserScore"
          query_params = [:email]

          allow(subject).to receive(:http).and_return(http)
          allow(subject).to receive(:make_response)
          expect(http)
            .to receive(:get).with(endpoint, hash_including(*query_params))

          subject.last_assessment(user)
        end
      end

      describe '#all_assessments' do
        it 'GETs /GetAssessmentNum' do
          http = double
          subject = make_subject(http)
          user = make_user
          endpoint = "#{BASE_URL}/GetAssessmentNum"
          query_params = [:email, :accesscode]

          allow(subject).to receive(:http).and_return(http)
          allow(subject).to receive(:make_response)
          expect(http)
            .to receive(:get).with(endpoint, hash_including(*query_params))

          subject.all_assessments(user)
        end
      end

      describe '#assessment_result' do
        it 'GETs /GetAssessmentNum' do
          http = double
          subject = make_subject(http)
          user = make_user
          endpoint = "#{BASE_URL}/GetAssessmentResult"
          query_params = [:email, :accesscode, 'AssessmentNumber', :format]

          allow(subject).to receive(:http).and_return(http)
          allow(subject).to receive(:make_response)
          expect(http)
            .to receive(:get).with(endpoint, hash_including(*query_params))

          subject.assessment_result(user, 42)
        end
      end

      describe Endpoints::BodyNormalizer do
        def make_subject
          Endpoints::BodyNormalizer.new
        end

        describe '#normalize_xml' do
          it 'parses the XML from the response body' do
            subject = make_subject
            body = '<AnElement></AnElement>'

            expect(MultiXml).to receive(:parse).with(body)
            subject.normalize_xml(body)
          end
        end

        describe '#normalize_body' do
          it 'recursively normalizes keys if body is a Hash' do
            subject = make_subject
            body = {
              'HelloThere' => [
                'OhWow' => 1
              ],
              'SoCool' => {
                'ThatThis' => 2,
                'ActuallyWorks' => 3
              }
            }

            expected_body = {
              'hello_there' => [
                'oh_wow' => 1
              ],
              'so_cool' => {
                'that_this' => 2,
                'actually_works' => 3
              }
            }

            expect(subject.normalize_body(body)).to eq(expected_body)
          end

          it 'also works if body is a HashWithIndifferentAccess' do
            subject = make_subject
            body = {
              'HelloThere' => [
                'OhWow' => 1
              ],
              'SoCool' => {
                'ThatThis' => 2,
                'ActuallyWorks' => 3
              }
            }.with_indifferent_access

            expected_body = {
              'hello_there' => [
                'oh_wow' => 1
              ],
              'so_cool' => {
                'that_this' => 2,
                'actually_works' => 3
              }
            }

            expect(subject.normalize_body(body)).to eq(expected_body)
          end

          it 'maps #normalize_body over each element if body is an Array' do
            subject = make_subject
            body = [
              'HiThere' => 1,
              'FooBar' => 2
            ]

            expected_body = [
              'hi_there' => 1,
              'foo_bar' => 2
            ]
            expect(subject.normalize_body(body)).to eq(expected_body)
          end

          it 'returns the given value otherwise' do
            subject = make_subject
            body = 'hi'

            expect(subject.normalize_body(body)).to eq(body)
          end
        end
      end
    end
  end
end
