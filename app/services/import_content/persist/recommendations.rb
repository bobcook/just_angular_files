module ImportContent
  module Persist
    class Recommendations
      attr_reader :content, :new_keywords, :old_keywords

      def initialize(content, new_keywords, old_keywords = [])
        @content = content
        @new_keywords = new_keywords
        @old_keywords = old_keywords
      end

      def create
        add_new_items
      end

      def update
        remove_old_items
        add_new_items
      end

      private

      def add_new_items
        ids_to_add =
          pillar_keywords(keyword_diff.to_add) +
          neuro_keywords(keyword_diff.to_add)

        assessment_questions(ids_to_add).map do |question|
          create_recommendation(question, content)
        end
      end

      def remove_old_items
        ids_to_remove =
          pillar_keywords(keyword_diff.to_remove) +
          neuro_keywords(keyword_diff.to_remove)

        existing_recommendations(ids_to_remove).map do |recommendation|
          destroy_recommendation(recommendation)
        end
      end

      def create_recommendation(assessment_question, recommendable)
        QuestionRecommendation.find_or_create_by(
          assessment_question: assessment_question,
          recommendable: recommendable
        )
      end

      def destroy_recommendation(recommendation)
        recommendation.destroy!
      end

      def existing_recommendations(ids)
        content.question_recommendations.where(external_id: ids)
      end

      def assessment_questions(external_recommendation_ids)
        AssessmentQuestion.where(
          external_recommendation_id: external_recommendation_ids
        )
      end

      def pillar_keywords(keywords)
        Parse::Recommended::PillarQuestions.from(keywords)
      end

      def neuro_keywords(keywords)
        Parse::Recommended::NeuroTestQuestions.from(keywords)
      end

      def keyword_diff
        @keyword_diff ||= ImportContent::Diff.new(old_keywords, new_keywords)
      end
    end
  end
end
