module Lifestyle
  module Questions
    class Scorable
      class UnprocessableResponseValue < RuntimeError; end
      class QuestionResponseMismatched < RuntimeError; end

      attr_reader :question, :response

      def initialize(assessment_question, assessment_response)
        @question = assessment_question
        @response = assessment_response
        fail QuestionResponseMismatched unless matches?(question, response)
        fail UnprocessableResponseValue unless valid_value?(response.response)
      end

      # Assumes:
      #
      # * Only care about scoring 1 pillar / question
      # * Pillar is determined by looking at all recommended content
      #   and getting the pillar in majority
      def pillar
        @pillar ||= begin
          (_, pillar_group) =
            question
            .recommended_content
            .flat_map(&:pillars)
            .group_by(&:id)
            .max_by(&:count)

          pillar_group.first
        end
      end

      def score
        @score ||= calc_score(response.response)
      end

      # Assumes:
      #
      # * Only processing scores for radio button questions
      # * Radio button question values are 1-(2,3,4)
      def calc_score(raw_response_value)
        response_value = raw_response_value.to_f
        values = answer_values.map(&:to_f)
        max_value = values.max
        one_point_score = 10.0 / (max_value - 1.0)

        result = ((response_value - 1.0) * one_point_score)
        result.nan? ? 0.0 : result
      end

      private

      def answer_values
        @answer_values ||= question.answer_values
      end

      def matches?(question, response)
        response.assessment_question == question
      end

      def valid_value?(value)
        value && integer?(value)
      end

      def integer?(value)
        value.to_i.to_s == value
      end
    end
  end
end
