require 'rails_helper'

module Lifestyle
  module Questions
    describe Scorable do
      before(:each) do
        Pillar.default_types.each do |slug|
          create("#{slug}_pillar")
        end
      end

      def make_response_for(question, response_value)
        create(
          :assessment_response,
          assessment_question: question,
          response: response_value
        )
      end

      def make_subject(question, response = nil)
        response ||= make_response_for(question, '4')
        Questions::Scorable.new(question, response)
      end

      def round(score)
        score.round(2)
      end

      describe '#pillar' do
        it 'takes the pillar from the question' do
          pillar = create(:pillar)
          question = create(:assessment_question, pillar: pillar)

          subject = make_subject(question)
          expect(subject.pillar).to eql(pillar)
        end
      end

      describe '#calc_score' do
        context 'question w/ 2 answer values' do
          def make_question
            create(:assessment_question, answer_values: %w(1 2))
          end

          it 'normalizes a 1 to a 10' do
            question = make_question
            subject = make_subject(question)

            expect(subject.calc_score(1)).to be_within(0.01).of(10)
          end

          it 'normalizes a 2 to a 6.67' do
            question = make_question
            subject = make_subject(question)

            expect(subject.calc_score(2)).to be_within(0.01).of(6.67)
          end
        end

        context 'question w/ 3 answer values' do
          def make_question
            create(:assessment_question, answer_values: %w(1 2 3))
          end

          it 'normalizes a 1 to a 10' do
            question = make_question
            subject = make_subject(question)

            expect(subject.calc_score(1)).to be_within(0.01).of(10)
          end

          it 'normalizes a 2 to a 6.67' do
            question = make_question
            subject = make_subject(question)

            expect(subject.calc_score(2)).to be_within(0.01).of(6.67)
          end

          it 'normalizes a 3 to 3.33' do
            question = make_question
            subject = make_subject(question)

            expect(subject.calc_score(3)).to be_within(0.01).of(3.33)
          end

          context 'answers are not contiguous' do
            def make_question
              create(:assessment_question, answer_values: %w(1 3 4))
            end

            it 'normalizes a 1 to a 10' do
              question = make_question
              subject = make_subject(question)

              expect(subject.calc_score(1)).to be_within(0.01).of(10)
            end

            it 'normalizes a 3 to 3.33' do
              question = make_question
              subject = make_subject(question)

              expect(subject.calc_score(3)).to be_within(0.01).of(3.33)
            end

            it 'normalizes a 4 to 0' do
              question = make_question
              subject = make_subject(question)

              expect(subject.calc_score(4)).to be_within(0.01).of(0)
            end
          end
        end

        context 'question w/ 4 answer values' do
          def make_question
            create(:assessment_question, answer_values: %w(1 2 3 4))
          end

          it 'normalizes a 1 to a 10' do
            question = make_question
            subject = make_subject(question)

            expect(subject.calc_score(1)).to be_within(0.01).of(10)
          end

          it 'normalizes a 2 to a 6.67' do
            question = make_question
            subject = make_subject(question)

            expect(subject.calc_score(2)).to be_within(0.01).of(6.67)
          end

          it 'normalizes a 3 to 3.33' do
            question = make_question
            subject = make_subject(question)

            expect(subject.calc_score(3)).to be_within(0.01).of(3.33)
          end

          it 'normalizes a 4 to 0' do
            question = make_question
            subject = make_subject(question)

            expect(subject.calc_score(4)).to be_within(0.01).of(0)
          end
        end
      end
    end
  end
end
