require 'rails_helper'

describe VideoArticle do
  def make_subject
    VideoArticle.new
  end

  describe '#basic?' do
    it 'is false' do
      expect(make_subject.basic?).to eq(false)
    end
  end

  describe '#video?' do
    it 'is true' do
      expect(make_subject.video?).to eq(true)
    end
  end

  describe '#slideshow?' do
    it 'is false' do
      expect(make_subject.slideshow?).to eq(false)
    end
  end
end
