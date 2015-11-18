require 'rails_helper'

module ImportContent
  describe ProcessArticleJson do
    def make_subject
      cms_json = {
        'content': [{
          'mastheadTitle': 'blah title',
          'type': 'article'
        }],
        'created': Time.zone.now,
        'lastmodified': Time.zone.now,
        'url': 'http://blah.com'
      }

      ImportContent::ProcessArticleJson.new(cms_json)
    end

    describe '#convert_content' do
      it 'returns a hash that correspond to articles table columns' do
        def all_keys_exist?
          subject = make_subject
          subject.convert_content.keys.all? do |key|
            Article.column_names.include?(key.to_s)
          end
        end
        expect(all_keys_exist?).to eq(true)
      end
    end
  end
end
