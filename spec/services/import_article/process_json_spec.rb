require 'rails_helper'

module ImportArticle
  describe ProcessJson do
    def make_subject
      cms_json = {
        'jcr:title': 'blah title',
        'PrintDate': Time.zone.now,
        'cq:lastModified': Time.zone.now,
        'jcr:uuid': 'abc123',
        'url': 'http://blah.com',
        'junk_field': 'blah'
      }

      ImportArticle::ProcessJson.new(cms_json)
    end

    describe '#convert_article' do
      it 'returns a hash that correspond to articles table columns' do
        def all_keys_exist?
          subject = make_subject

          subject.convert_article.keys.all? do |key|
            Article.column_names.include?(key.to_s)
          end
        end
        expect(all_keys_exist?).to eq(true)
      end
    end
  end
end
