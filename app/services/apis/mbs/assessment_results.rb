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
          .compact
          .fetch('assessment', {})
          .fetch('assessment_result', {})

        new(results_data)
      end

      def self.neuro_category_names
        [
          :processing_speed,
          :sustained_attention,
          :working_memory,
          :cognitive_flexibility,
          :executive_function,
          :recognition_memory
        ]
      end

      def any_content?
        !results_data.empty?
      end

      def overall_score
        @overall_score ||= parse_float(:overall_score)
      end

      def processing_speed
        @processing_speed ||=
          parse_float(:thinking_score_processing_speed)
      end

      def sustained_attention
        @sustained_attention ||=
          parse_float(:thinking_score_sustained_attention)
      end

      def working_memory
        @working_memory ||= parse_float(:thinking_score_working_memory)
      end

      def cognitive_flexibility
        @cognitive_flexibility ||= parse_float(:thinking_score_flexibility)
      end

      def executive_function
        @executive_function ||= parse_float(:thinking_score_executive_function)
      end

      def recognition_memory
        @recognition_memory ||= parse_float(:thinking_score_recall_memory)
      end

      private

      def parse_float(field_name)
        results_data[field_name].try(:to_f)
      end
    end
  end
end
