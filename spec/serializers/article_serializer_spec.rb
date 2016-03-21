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
      expect(subject.path_pillar).to eq('art')
    end
  end
end
