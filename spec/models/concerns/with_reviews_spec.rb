require 'rails_helper'

describe WithReviews do
  let(:content) { create(:article) }

  describe '#recommend_percentage' do
    it 'returns nil if content has no reviews' do
      expect(content.recommend_percentage).to eq(nil)
    end

    it 'returns zero if all reviews are negative' do
      content.reviews << create_list(:review, 2, recommend: false)
      expect(content.recommend_percentage).to eq(0.0)
    end

    it 'returns one if all reviews are positive' do
      content.reviews << create_list(:review, 2, recommend: true)
      expect(content.recommend_percentage).to eq(1.0)
    end

    it 'returns the correct percentage for mixed reviews' do
      content.reviews << create(:review, recommend: true)
      content.reviews << create(:review, recommend: false)
      expect(content.recommend_percentage).to eq(0.5)
    end
  end
end
