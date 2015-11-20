require 'rails_helper'

module ImportContent
  describe Persist do
    let!(:pillar1) { create(:keeping_fit_pillar) }
    let!(:pillar2) { create(:learning_more_pillar) }
    let!(:pillar3) { create(:eating_right_pillar) }

    let(:today) { Time.zone.now.noon }
    let(:cms_url) { 'http://blah.com' }

    def content_hash
      {
        title: 'blah title',
        published_at: today,
        last_modified: today,
        cms_url: cms_url,
        payload: { brainHealthPillar: [pillar1.name, pillar2.name] },
        type: 'BasicArticle'
      }
    end

    def make_subject
      ImportContent::Persist.new(content_hash, Article, BasicArticle)
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
            create(:basic_article, last_modified: today, cms_url: cms_url)
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
              last_modified: yesterday, cms_url: cms_url,
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
              last_modified: yesterday, cms_url: cms_url,
              pillars: [pillar1, pillar2, pillar3]
            )
            make_subject.import

            expect(Article.last.pillars.pluck('name'))
              .to match_array([pillar1.name, pillar2.name])
          end

          it 'new pillars are added' do
            create(
              :basic_article,
              last_modified: yesterday, cms_url: cms_url, pillars: [pillar1]
            )
            make_subject.import

            expect(Article.last.pillars.pluck('name'))
              .to match_array([pillar1.name, pillar2.name])
          end

          it 'old pillars are deleted and new pillars are added' do
            create(
              :basic_article,
              last_modified: yesterday, cms_url: cms_url,
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
            cms_url: cms_url,
            payload: { 'a' => 1 }
          }
        end

        def make_subject
          ImportContent::Persist.new(content_hash, Game)
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

  describe Persist::PillarQueries do
    def make_subject
      Persist::PillarQueries.new
    end

    describe '.find_pillar' do
      context 'Pillar exists with name and display_name' do
        let!(:pillar) { create(Pillar.default_types.first + '_pillar') }

        it 'finds the pillar when the name is given' do
          subject = make_subject
          name = pillar.name

          expect(subject.find_pillar(name)).to eq(pillar)
        end

        it 'finds the pillar when the display name is given' do
          subject = make_subject
          display_name = pillar.display_name

          expect(subject.find_pillar(display_name)).to eq(pillar)
        end
      end

      it 'returns nil otherwise' do
        subject = make_subject
        name = 'DOESNT_EXIST'

        expect(subject.find_pillar(name)).to eq(nil)
      end
    end

    describe '.pillar_categorizations_for' do
      it 'is all of the PillarCategorizations for the content' do
        subject = make_subject
        expected_count = 2
        content = create(:recipe, pillar_count: expected_count)

        expect(subject.pillar_categorizations_for(content).length)
          .to eq(expected_count)
      end

      it 'is empty if there are none' do
        subject = make_subject
        content = create(:recipe)
        content.pillars.destroy_all

        expect(subject.pillar_categorizations_for(content)).to be_empty
      end
    end

    describe '.names_to_add' do
      it 'is the diff between cms pillar names and the content pillar names' do
        subject = make_subject
        pillar1 = create(:keeping_fit_pillar)
        pillar2 = create(:learning_more_pillar)
        pillar3 = create(:eating_right_pillar)
        content = create(:recipe)

        content.pillars.destroy_all
        content.update(pillars: [pillar1])

        cms_names = [pillar1, pillar2, pillar3].map(&:name)
        expected_names = [pillar2, pillar3].map(&:name)

        expect(subject.names_to_add(cms_names, content)).to eq(expected_names)
      end

      it 'works with display_names' do
        subject = make_subject
        pillar1 = create(:keeping_fit_pillar)
        pillar2 = create(:learning_more_pillar)
        pillar3 = create(:eating_right_pillar)
        content = create(:recipe)

        content.pillars.destroy_all
        content.update(pillars: [pillar1])

        cms_names = [pillar1, pillar2, pillar3].map(&:display_name)
        expected_names = [pillar2, pillar3].map(&:name)

        expect(subject.names_to_add(cms_names, content)).to eq(expected_names)
      end

      it 'works with a combination of names and display names' do
        subject = make_subject
        pillar1 = create(:keeping_fit_pillar)
        pillar2 = create(:learning_more_pillar)
        pillar3 = create(:eating_right_pillar)
        content = create(:recipe)

        content.pillars.destroy_all
        content.update(pillars: [pillar1])

        cms_names = [
          pillar1.name,
          pillar1.display_name,
          pillar2.display_name,
          pillar3.name,
          pillar3.display_name
        ]
        expected_names = [pillar2, pillar3].map(&:name)

        expect(subject.names_to_add(cms_names, content)).to eq(expected_names)
      end
    end
  end
end
