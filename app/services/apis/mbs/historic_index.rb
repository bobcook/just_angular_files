module Apis
  module MBS
    class HistoricIndex
      attr_reader :assessment_list_data

      def initialize(assessment_list_data)
        @assessment_list_data = assessment_list_data || []
      end

      def self.from_assessment_data(data)
        data = data.body if data.respond_to?(:body)

        assessment_list_data =
          data
          .fetch('assessment_num_status_contract', {})
          .fetch('assessment_num_xml', {})
          .fetch('assessment', {})
          .fetch('assessment_data', {})

        new(assessment_list_data)
      end

      def latest_assessment_num
        latest_entry.try(:assessment_number)
      end

      def latest_session_name
        latest_entry.try(:session_name)
      end

      def latest_assessment_num_in(list)
        list.compact.map(&:to_i).include?(latest_assessment_num.to_i)
      end

      def any_assessments?
        entries.any?
      end

      private

      def latest_entry
        entries.first
      end

      def entries
        @entries ||=
          assessment_list_data.map(&method(:make_entry))
          .sort_by(&:assessment_number)
          .reverse
      end

      def make_entry(entry_data)
        OpenStruct.new(entry_data)
      end
    end
  end
end
