require 'rails_helper'

describe BasicArticle do
  def make_subject
    BasicArticle.new
  end

  describe '#basic?' do
    it 'is true' do
      expect(make_subject.basic?).to eq(true)
    end
  end

  describe '#video?' do
    it 'is false' do
      expect(make_subject.video?).to eq(false)
    end
  end

  describe '#slideshow?' do
    it 'is false' do
      expect(make_subject.slideshow?).to eq(false)
    end
  end
end
