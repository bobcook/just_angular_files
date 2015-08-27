require 'rails_helper'

describe SlideshowArticle do
  def make_subject
    SlideshowArticle.new
  end

  describe '#basic?' do
    it 'is false' do
      expect(make_subject.basic?).to eq(false)
    end
  end

  describe '#video?' do
    it 'is false' do
      expect(make_subject.video?).to eq(false)
    end
  end

  describe '#slideshow?' do
    it 'is true' do
      expect(make_subject.slideshow?).to eq(true)
    end
  end
end
