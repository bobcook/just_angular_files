module Apis
  module MBS
    class AssessmentResults
      include CollectionUtils

      attr_reader :results_data

      def initialize(results_data)
        @results_data = (results_data || {}).with_indifferent_access
      end

      def self.from_results_data(data)
        data = data.body if data.respond_to?(:body)

        results_data =
          data
          .fetch('assessment', {})
          .fetch('assessment_result', {})

        new(results_data)
      end

      def any_content?
        !results_data.empty?
      end

      def overall_score
        @overall_score ||= parse_float(:overall_score)
      end

      def motor_coordination
        @motor_coordination ||=
          parse_float(:thinking_score_motor_coordination)
      end

      def processing_speed
        @processing_speed ||=
          parse_float(:thinking_score_processing_speed)
      end

      def sustained_attention
        @sustained_attention ||=
          parse_float(:thinking_score_sustained_attention)
      end

      def controlled_attention
        @controlled_attention ||=
          parse_float(:thinking_score_controlled_attention)
      end

      def flexibility
        @flexibility ||= parse_float(:thinking_score_flexibility)
      end

      def inhibition
        @inhibition ||= parse_float(:thinking_score_inhibition)
      end

      def working_memory
        @working_memory ||= parse_float(:thinking_score_working_memory)
      end

      def recall_memory
        @recall_memory ||= parse_float(:thinking_score_recall_memory)
      end

      def executive_function
        @executive_function ||= parse_float(:thinking_score_executive_function)
      end

      private

      def parse_float(field_name)
        results_data[field_name].try(:to_f)
      end
    end
  end
end
