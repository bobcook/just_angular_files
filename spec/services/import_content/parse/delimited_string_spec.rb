require 'rails_helper'

module ImportContent
  module Parse
    describe DelimitedString do
      def make_subject(delimiter = ',')
        Parse::DelimitedString.new(delimiter)
      end

      describe '#parse' do
        context 'given comma separated string' do
          it 'returns an array of the elements' do
            subject = make_subject
            input = 'hi, there, 0192, testing'
            expected = %w(hi there 0192 testing)

            expect(subject.parse(input)).to eq(expected)
          end
        end

        context 'given an empty string' do
          it 'returns an empty list' do
            subject = make_subject
            input = ''
            expected = []

            expect(subject.parse(input)).to eq(expected)
          end
        end

        context 'given nil' do
          it 'returns an empty list' do
            subject = make_subject
            input = nil
            expected = []

            expect(subject.parse(input)).to eq(expected)
          end
        end
      end
    end
  end
end
