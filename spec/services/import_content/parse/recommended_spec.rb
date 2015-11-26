require 'rails_helper'

module ImportContent
  module Parse
    describe Recommended do
      describe Recommended::NeuroTestQuestions do
        def make_subject
          Parse::Recommended::NeuroTestQuestions.new
        end

        describe '#parse' do
          it 'is empty when there are no neuro test questions in the array' do
            subject = make_subject
            keywords = %w(apples bananas hithere)

            expect(subject.parse(keywords)).to be_empty
          end

          it 'returns neuro test questions from the array' do
            subject = make_subject
            keywords = %w(apples bananas 00123 hithere 11101 11234)
            expected_questions = %w(11101 11234)

            expect(subject.parse(keywords)).to eq(expected_questions)
          end
        end
      end

      describe Recommended::PillarQuestions do
        def make_subject
          Parse::Recommended::PillarQuestions.new
        end

        describe '#parse' do
          it 'is empty when there are no neuro test questions in the array' do
            subject = make_subject
            keywords = %w(apples bananas hithere)

            expect(subject.parse(keywords)).to be_empty
          end

          it 'returns pillar questions from the array' do
            subject = make_subject
            keywords = %w(apples 00768 bananas hithere 11101 11234 00232)
            expected_questions = %w(00768 00232)

            expect(subject.parse(keywords)).to eq(expected_questions)
          end
        end
      end
    end
  end
end
