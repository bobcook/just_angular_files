require 'rails_helper'

module Apis
  module MBS
    describe HistoricIndex do
      def make_entry(n = 0)
        {
          'assessment_number' => n.to_s,
          'session_name' => "MYBRAIN-617488-#{n}",
          'report_reference' => "RR2650984#{n}"
        }
      end

      def make_stubbed_assessment_data(num_entries = 2)
        num_entries.times.map(&method(:make_entry))
      end

      def make_subject(assessment_data)
        HistoricIndex.new(assessment_data)
      end

      describe '#latest_assessment_num' do
        it 'returns the entry with the highest #assessment_number' do
          num_entries = 3
          assessment_data = make_stubbed_assessment_data(num_entries)
          subject = make_subject(assessment_data)
          expected = (num_entries - 1).to_s

          expect(subject.latest_assessment_num).to eq(expected)
        end

        it 'takes the highest by integer value, not string value' do
          num_entries = 21
          assessment_data = make_stubbed_assessment_data(num_entries)
          subject = make_subject(assessment_data)
          expected = (num_entries - 1).to_s

          expect(subject.latest_assessment_num).to eq(expected)
        end

        it 'is nil if there are no historic assessments' do
          assessment_data = []
          subject = make_subject(assessment_data)

          expect(subject.latest_assessment_num).to be_nil
        end
      end

      describe '#latest_assessment_num_in' do
        it 'is true if latest_entry#assessment_number is in the list' do
          assessment_data = make_stubbed_assessment_data
          subject = make_subject(assessment_data)
          assessment_number = subject.latest_assessment_num
          nums_to_check = ['15', nil] + [assessment_number]

          expect(assessment_number).to_not be_nil
          expect(subject.latest_assessment_num_in(nums_to_check)).to eq(true)
        end

        it 'is false if there is no latest_assessment_num' do
          subject = make_subject([])
          nums_to_check = ['1', nil, '2']

          expect(subject.latest_assessment_num).to eq(nil)
          expect(subject.latest_assessment_num_in(nums_to_check))
            .to eq(false)
        end

        it 'is false otherwise' do
          subject = make_subject(make_stubbed_assessment_data(3))
          nums_to_check = ['0', '1', nil]

          expect(subject.latest_assessment_num_in(nums_to_check))
            .to eq(false)
        end
      end
    end
  end
end
