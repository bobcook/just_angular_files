require 'rails_helper'

module Api
  module V1
    describe RecipesController do
      before :each do
        request.env['HTTP_ACCEPT'] = 'application/json'
      end

      describe '#show' do
        it 'returns the JSON for a found Recipe' do
          recipe = create(:recipe)
          serialized = RecipeSerializer.new(recipe).to_json

          get :show, id: recipe.id
          expect(response.body).to eql(serialized)
        end

        it 'returns a 204 when no Recipe is found' do
          get :show, id: 1
          expect(response.status).to eq(204)
        end
      end

      describe '#index' do
        let(:per_page) { 2 }

        before(:each) do
          allow_any_instance_of(RecipesController)
            .to receive(:per_page).and_return(per_page)
        end

        it 'returns a page of Recipes' do
          recipes = create_list(:recipe, per_page)
          serialized = ActiveModel::ArraySerializer.new(
            recipes,
            each_serializer: RecipeSerializer,
            root: 'recipes'
          ).to_json

          get :index
          result = JSON.parse(response.body)['recipes']

          expect(result).not_to be_empty
          expect(result).to match_array(JSON.parse(serialized)['recipes'])
        end

        it 'returns a 206 status' do
          create_list(:recipe, per_page + 1)

          get :index
          expect(response.status).to eq(206)
        end

        it 'returns a 200 status when on the last page' do
          create_list(:recipe, per_page + 1)

          get :index, page: 2
          expect(response.status).to eq(200)
        end
      end
    end
  end
end
