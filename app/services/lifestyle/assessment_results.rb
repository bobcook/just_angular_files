module Lifestyle
  class AssessmentResults
    def self.lifestyle_category_names
      ImportContent::PillarMapping.new_slugs
    end

    attr_reader :responses

    def initialize(responses)
      @responses = responses
    end

    def nourish
      @nourish ||= avg_of_pillar(:nourish, scorables)
    end

    def discover
      @discover ||= avg_of_pillar(:discover, scorables)
    end

    def connect
      @connect ||= avg_of_pillar(:connect, scorables)
    end

    def move
      @move ||= avg_of_pillar(:move, scorables)
    end

    def relax
      @relax ||= avg_of_pillar(:relax, scorables)
    end

    private

    def scorables
      @scorables ||=
        responses
        .select { |r| scorable?(r.assessment_question) }
        .map { |r| make_scorable(r.assessment_question, r) }
    end

    def avg_of_pillar(pillar, scorables)
      avg_of(with_pillar(pillar, scorables))
    end

    def avg_of(scorables)
      scores = scorables.map(&:score)
      result = scores.inject(0.0) { |a, e| a + e } / scores.size
      result.try { |r| r.round(2) } || 0
    end

    def with_pillar(pillar_name, scorables)
      scorables.select do |scorable|
        scorable.pillar.display_name.downcase.to_sym == pillar_name
      end
    end

    def make_scorable(question, response)
      Lifestyle::Questions::Scorable.new(question, response)
    end

    def scorable?(question)
      radio?(question) && enough_values?(question)
    end

    def radio?(question)
      question.type == 'AssessmentQuestionRadio'
    end

    def enough_values?(question)
      [2, 3, 4].include?(question.answer_values.length)
    end
  end
end
