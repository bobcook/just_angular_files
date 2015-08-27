require 'rails_helper'

module ImportArticle
  describe Persist do
    def article_hash
      {
        title: 'blah title',
        publish_date: Time.zone.now,
        last_modified: Time.zone.now,
        uuid: 'abc123',
        url: 'http://blah.com',
        payload: { 'a': 1 },
        type: 'BasicArticle'
      }
    end

    def make_subject
      ImportArticle::Persist.new(article_hash, BasicArticle)
    end

    describe '#create_or_update' do
      it 'creates a new Article if article is not in the database' do
        subject = make_subject
        expect { subject.create_or_update }.to change { Article.count }.by(1)
      end

      it 'updates existing article if article has been modified' do
        old_modified_time = Time.zone.now - 1.day
        new_modified_time = article_hash[:last_modified]
        Article.create(
          article_hash.merge(last_modified: old_modified_time)
        )
        subject = make_subject

        expect { subject.create_or_update }
          .to change { Article.last.last_modified.to_s }
          .from(old_modified_time.to_s).to(new_modified_time.to_s)
      end

      it 'does not update if article has not been modified' do
        Article.create(article_hash)
        subject = make_subject

        expect { subject.create_or_update }
          .to_not change { Article.last.last_modified.to_s }
      end
    end
  end
end
