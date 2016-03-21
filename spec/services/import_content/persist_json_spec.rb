require 'rails_helper'

module ImportContent
  describe Persist do
    let!(:pillar1) { create(:keeping_fit_pillar) }
    let!(:pillar2) { create(:learning_more_pillar) }
    let!(:pillar3) { create(:eating_right_pillar) }

    let(:today) { Time.zone.now.noon }
    let(:cms_url) do
      'http://www.aarp.org/content/specialized-membership/' \
        'staying-sharp/en/act/connect/16/gratitude-peace-of-mind' \
        '/_jcr_content.ss.json'
    end
    let(:slug) { 'slug' }

    def content_hash
      {
        title: 'blah title',
        published_at: today,
        last_modified: today,
        slug: slug,
        cms_url: cms_url,
        payload: { brainHealthPillar: [pillar1.name, pillar2.name] },
        type: 'BasicArticle'
      }
    end

    def make_subject
      ImportContent::Importer.new(content_hash, Article, BasicArticle)
    end

    describe '#import' do
      context 'when imported article is not in database' do
        it 'creates a new Article' do
          subject = make_subject

          expect { subject.import }.to change { Article.count }.by(1)
        end

        it 'creates new PillarCategorizations' do
          subject = make_subject

          expect { subject.import }
            .to change { PillarCategorization.count }.by(2)
        end
      end

      context 'when imported article is in the database' do
        context 'and has not been modified' do
          let!(:article) do
            create(:basic_article, last_modified: today, slug: slug)
          end

          it 'article is not updated' do
            subject = make_subject

            expect { subject.import }
              .to_not change { Article.last.last_modified.to_s }
          end

          it 'pillars are not updated' do
            subject = make_subject

            expect { subject.import }
              .to_not change { PillarCategorization }
          end
        end

        context 'and has been modified' do
          let(:yesterday) { today - 1.day }

          it 'article is updated' do
            create(
              :basic_article,
              last_modified: yesterday, slug: slug,
              pillars: [pillar1, pillar2]
            )
            subject = make_subject

            expect { subject.import }
              .to change { Article.last.last_modified.to_s }
              .from(yesterday.to_s).to(today.to_s)
          end

          it 'old pillars are deleted' do
            create(
              :basic_article,
              last_modified: yesterday, slug: slug,
              pillars: [pillar1, pillar2, pillar3]
            )
            make_subject.import

            expect(Article.last.pillars.pluck('name'))
              .to match_array([pillar1.name, pillar2.name])
          end

          it 'new pillars are added' do
            create(
              :basic_article,
              last_modified: yesterday, slug: slug, pillars: [pillar1]
            )
            make_subject.import

            expect(Article.last.pillars.pluck('name'))
              .to match_array([pillar1.name, pillar2.name])
          end

          it 'old pillars are deleted and new pillars are added' do
            create(
              :basic_article,
              last_modified: yesterday, slug: slug,
              pillars: [pillar2, pillar3]
            )
            make_subject.import

            expect(Article.last.pillars.pluck('name'))
              .to match_array([pillar1.name, pillar2.name])
          end
        end
      end

      context 'when content does not have pillars' do
        def content_hash
          {
            title: 'blah title',
            published_at: today,
            last_modified: today,
            slug: slug,
            payload: { 'a' => 1 },
            cms_url: cms_url
          }
        end

        def make_subject
          ImportContent::Importer.new(content_hash, Game)
        end

        it 'creates a new Game' do
          subject = make_subject

          expect { subject.import }.to change { Game.count }.by(1)
        end

        it 'creates new PillarCategorizations' do
          subject = make_subject

          expect { subject.import }
            .to change { PillarCategorization.count }.by(0)
        end
      end
    end
  end
end
