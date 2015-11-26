require 'rails_helper'

module ImportContent
  module Persist
    describe Recommendations do
      def make_subject(content, new_keywords, old_keywords = [])
        Recommendations.new(content, new_keywords, old_keywords)
      end

      describe '#create' do
        it 'creates a QuestionRecommendation for each NeuroTest keyword' do
          content = create(:recipe)
          neuro_questions = create_list(:assessment_question, 2)
          pillar_questions = [
            create(:assessment_question, external_recommendation_id: '11203')
          ]
          orig_keywords =
            %w(blueberries oranges) +
            neuro_questions.map(&:external_recommendation_id) +
            pillar_questions.map(&:external_recommendation_id)
          keywords = orig_keywords.shuffle

          subject = make_subject(content, keywords)

          expected_ids = neuro_questions.map(&:external_recommendation_id)

          expect(subject.create.map(&:external_id))
            .to include(*expected_ids)
        end

        it 'creates a QuestionRecommendation for each questionnaire keyword' do
          content = create(:recipe)
          neuro_questions = create_list(:assessment_question, 2)
          pillar_questions = [
            create(:assessment_question, external_recommendation_id: '11203'),
            create(:assessment_question, external_recommendation_id: '11303')
          ]
          orig_keywords =
            %w(strawberries bananas) +
            neuro_questions.map(&:external_recommendation_id) +
            pillar_questions.map(&:external_recommendation_id)
          keywords = orig_keywords.shuffle

          subject = make_subject(content, keywords)

          expected_ids = pillar_questions.map(&:external_recommendation_id)

          expect(subject.create.map(&:external_id))
            .to include(*expected_ids)
        end

        it 'is idempotent for QuestionRecommendation creation' do
          content = create(:recipe)
          neuro_questions = create_list(:assessment_question, 2)
          pillar_questions = [
            create(:assessment_question, external_recommendation_id: '11203'),
            create(:assessment_question, external_recommendation_id: '11303')
          ]
          orig_keywords =
            %w(strawberries bananas) +
            neuro_questions.map(&:external_recommendation_id) +
            pillar_questions.map(&:external_recommendation_id)
          keywords = orig_keywords.shuffle

          old_subject = make_subject(content, keywords)
          old_subject.create

          subject = make_subject(content, keywords)
          expect { subject.create }
            .not_to change { content.question_recommendations.count }
        end
      end

      describe '#update' do
        it 'deletes QuestionRecommendations for keywords no longer included' do
          content = create(:recipe)
          pillar_questions =
            create_list(:assessment_question, 3, :with_recommendation)
          old_ids = pillar_questions.map(&:external_recommendation_id)
          old_keywords = %w(pears apples) + old_ids

          old_subject = make_subject(content, old_keywords)
          old_subject.create

          dropped_ids = old_ids.take(1)
          new_keywords = old_keywords - dropped_ids
          subject = make_subject(content, new_keywords, old_keywords)

          expect { subject.update }
            .to change { content.question_recommendations.count }.by(-1)
        end

        it 'creates QuestionRecommendations for new keywords' do
          content = create(:recipe)
          pillar_questions =
            create_list(:assessment_question, 3, :with_recommendation)
          old_ids = pillar_questions.map(&:external_recommendation_id)
          old_keywords = %w(pears apples) + old_ids

          old_subject = make_subject(content, old_keywords)
          old_subject.create

          new_pillar_question = create(:assessment_question)
          new_keywords =
            old_keywords +
            ['howdy'] +
            [new_pillar_question.external_recommendation_id]
          subject = make_subject(content, new_keywords, old_keywords)

          expect { subject.update }
            .to change { content.question_recommendations.count }.by(+1)
        end
      end
    end
  end
end
