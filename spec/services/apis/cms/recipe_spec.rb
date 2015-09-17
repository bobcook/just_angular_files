require 'rails_helper'

module Apis
  module CMS
    describe Recipe do
      def make_subject(url, http)
        Apis::CMS::Recipe.new(url, http: http)
      end

      def dummy_response(body = {})
        Apis::Response.new(status: 200, body: body)
      end

      describe '#json_payload' do
        it 'GETs the recipe at the #api_url' do
          http = double
          expected_url = 'http://example.com/recipes/1.json'
          subject = make_subject(expected_url, http)

          allow(subject).to receive(:http).and_return(http)
          allow(Apis::Response)
            .to receive(:from_faraday).and_return(dummy_response)

          expect(http).to receive(:get).with(expected_url)
          subject.json_payload
        end
      end
    end
  end
end
