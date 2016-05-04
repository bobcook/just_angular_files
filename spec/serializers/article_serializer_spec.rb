require 'rails_helper'

describe ArticleSerializer do
  let(:cms_url) do
    'http://www.aarp.org/content/specialized-membership/staying-sharp/en/art/' \
      'connect/16/gratitude-peace-of-mind/_jcr_content.ss.json'
  end

  let(:article) { Hashie::Mash.new(cms_url: cms_url) }
  let(:subject) { ArticleSerializer.new(article) }
  describe '#path_year' do
    it 'extracts the year from cms_url' do
      expect(subject.path_year).to eq('16')
    end
  end

  describe '#path_pillar' do
    it 'extracts the pillar from the cms_url' do
      expect(subject.path_pillar).to eq('connect')
    end
  end

  describe '#video_id' do
    context 'for VideoArticle' do
      let(:video_id) { '12345' }
      let(:article) { Hashie::Mash.new(payload: { videoID: video_id }) }
      it 'returns the video id' do
        allow(article).to receive(:video?) { true }

        expect(ArticleSerializer.new(article).video_id).to eq(video_id)
      end
    end
    context 'for BasicArticle' do
      let(:article) { create :article }
      it 'does not return a video id' do
        allow(article).to receive(:video?) { false }

        expect(ArticleSerializer.new(article).video_id).to be_nil
      end
    end
  end
end
