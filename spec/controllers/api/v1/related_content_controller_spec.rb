require 'rails_helper'

module Api
  module V1
    describe RelatedContentController do
      before(:each) do
        request.env['HTTP_ACCEPT'] = 'application/json'
      end

      describe '#index' do
        before(:each) do
          Pillar.default_types.each do |slug|
            create("#{slug}_pillar")
          end
        end

        it 'queries for related content by pillars' do
          querying =
            double(recipes: [], articles: [], activities: [], games: [])
          params = {
            pillars: [Pillar.first.slug],
            recipes: 1,
            articles: 1,
            activities: 3,
            games: 1
          }
          allow(PillarQuerying).to receive(:new).and_return(querying)

          expect(querying).to receive(:recipes)
          expect(querying).to receive(:articles)
          expect(querying).to receive(:activities)
          expect(querying).to receive(:games)
          get :index, params
        end

        it 'returns a JSON object with appropriate content' do
          params = {
            pillars: [Pillar.first.slug],
            recipes: 1,
            articles: 1,
            activities: 3,
            games: 1
          }
          get(:index, params)

          expect(JSON.parse(response.body)['related_content'].keys)
            .to match_array(%w(recipes articles activities games))
        end
      end
    end
  end
end
