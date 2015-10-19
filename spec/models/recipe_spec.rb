require 'rails_helper'
require_relative './publishable_shared_examples'
require_relative './with_pillars_shared_examples'

describe Recipe do
  it { should have_many(:pillar_categorizations) }
  it { should have_many(:pillars).through(:pillar_categorizations) }
  it { should have_many(:user_recipes) }
  it { should have_many(:users).through(:user_recipes) }

  it_behaves_like 'it fulfills the WithPillars interface', :recipe

  describe 'scopes' do
    describe '::newest_first' do
      it 'has most recently updated recipes ahead of older ones' do
        old_recipes = create_list(:recipe, 2, last_modified: Time.now)
        latest_recipe = create(:recipe, last_modified: Time.now)
        recipe_count = (old_recipes + [latest_recipe]).count

        results = described_class.newest_first
        expect(results.count).to eq(recipe_count)
        expect(results.first).to eql(latest_recipe)
      end
    end
  end

  describe '#last_modified' do
    it_behaves_like(
      'it defaults to the current time',
      :recipe,
      :last_modified
    )
  end

  describe '#published_at' do
    it_behaves_like(
      'it defaults to the current time',
      :recipe,
      :published_at
    )
  end
end
