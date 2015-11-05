require 'rails_helper'

module Api
  module V1
    module Me
      describe RecipesController do
        let(:user) { create(:user) }
        before { sign_in(user) }

        describe 'GET #index' do
          it 'gives Recipes sorted newest-first by when the user saved them' do
            recipes = create_list(:recipe, 3)
            user.update(recipes: recipes)

            get :index, format: :json
            results = JSON.parse(response.body)['recipes']
            ordered_recipes = recipes.reverse
            expect(results.map { |r| r['id'] })
              .to eq(ordered_recipes.map(&:id))
          end
        end
      end
    end
  end
end
