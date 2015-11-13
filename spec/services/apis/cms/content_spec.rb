require 'rails_helper'

module Apis
  module CMS
    describe Content do
      def make_subject(url, http)
        Apis::CMS::Content.new(url, http: http)
      end

      def dummy_response(pillars)
        Apis::Response.new(
          body: { content: [{ 'brainHealthPillar': pillars }] }
        )
      end

      describe '#json_payload' do
        it 'returns a pillar array if given a pillar string'do
          pillar = 'pillar1'
          http = double
          expected_url = 'http://example.com/recipes/1.json'
          subject = make_subject(expected_url, http)

          allow(subject).to receive(:http).and_return(http)
          allow(Apis::Response)
            .to receive(:from_faraday).and_return(dummy_response(pillar))
          allow(http).to receive(:get)

          expect(subject.json_payload[:content][0][:brainHealthPillar])
            .to eq([pillar])
        end

        it 'returns the original array if given an array of pillars' do
          pillars = %w(pillar1 pillar2)
          http = double
          expected_url = 'http://example.com/recipes/1.json'
          subject = make_subject(expected_url, http)

          allow(subject).to receive(:http).and_return(http)
          allow(Apis::Response)
            .to receive(:from_faraday).and_return(dummy_response(pillars))
          allow(http).to receive(:get)

          expect(subject.json_payload[:content][0][:brainHealthPillar])
            .to eq(pillars)
        end
      end
    end
  end
end
