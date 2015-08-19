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
    end
  end
end
