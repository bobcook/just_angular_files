require 'rails_helper'

describe ExploreContent do
  let(:limit) { 2 }

  def make_subject
    ExploreContent.new(
      games: limit, articles: limit, recipes: limit, activites: limit
    )
  end

  describe '#all_last_page?' do
    def make_content
      create_list(:basic_article, limit)
      create_list(:recipe, limit)
      create_list(:activity, limit)
    end

    it 'returns true if number of items is below the limit' do
      create_list(:game, limit - 1)
      make_content

      expect(make_subject.all_last_page?).to eq(true)
    end

    it 'returns true if number of items is equal the limit' do
      create_list(:game, limit)
      make_content

      expect(make_subject.all_last_page?).to eq(true)
    end

    it 'returns false if number of items above the limit' do
      create_list(:game, limit + 1)
      make_content

      expect(make_subject.all_last_page?).to eq(false)
    end
  end
end
