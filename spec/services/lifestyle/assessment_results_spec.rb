require 'rails_helper'

module Lifestyle
  describe AssessmentResults do
    def scorable(score, pillar)
      double(score: score, pillar: pillar)
    end

    def make_subject(questions = [])
      Lifestyle::AssessmentResults.new(questions)
    end

    def avg(*scores)
      scores.inject(0.0) { |a, e| a + e } / scores.size
    end

    let!(:nourish_pillar) { create(:nourish_pillar) }
    let!(:discover_pillar) { create(:discover_pillar) }
    let!(:connect_pillar) { create(:connect_pillar) }
    let!(:move_pillar) { create(:move_pillar) }
    let!(:relax_pillar) { create(:relax_pillar) }

    describe '#nourish' do
      it 'returns the average of responses for Nourish questions' do
        questions = [
          scorable(6.67, nourish_pillar),
          scorable(3.33, nourish_pillar),
          scorable(6.67, discover_pillar),
          scorable(10.0, discover_pillar)
        ]
        subject = make_subject
        allow(subject)
          .to receive(:scorables).and_return(questions)

        expect(subject.nourish).to be_within(0.1).of(avg(6.67, 3.33))
      end
    end

    describe '#discover' do
      it 'returns the average of responses for Discover questions' do
        questions = [
          scorable(3.33, discover_pillar),
          scorable(3.33, nourish_pillar),
          scorable(6.67, move_pillar),
          scorable(10.0, discover_pillar)
        ]
        subject = make_subject
        allow(subject)
          .to receive(:scorables).and_return(questions)

        expect(subject.discover).to be_within(0.1).of(avg(3.33, 10.0))
      end
    end

    describe '#connect' do
      it 'returns the average of responses for Connect questions' do
        questions = [
          scorable(3.33, connect_pillar),
          scorable(3.33, nourish_pillar),
          scorable(6.67, connect_pillar),
          scorable(10.0, discover_pillar)
        ]
        subject = make_subject
        allow(subject)
          .to receive(:scorables).and_return(questions)

        expect(subject.connect).to be_within(0.1).of(avg(3.33, 6.67))
      end
    end

    describe '#move' do
      it 'returns the average of responses for Move questions' do
        questions = [
          scorable(0, move_pillar),
          scorable(3.33, nourish_pillar),
          scorable(10.0, move_pillar)
        ]
        subject = make_subject
        allow(subject)
          .to receive(:scorables).and_return(questions)

        expect(subject.move).to be_within(0.1).of(avg(0, 10.0))
      end
    end

    describe '#relax' do
      it 'returns the average of responses for Relax questions' do
        questions = [
          scorable(0, move_pillar),
          scorable(3.33, relax_pillar),
          scorable(10.0, move_pillar)
        ]
        subject = make_subject
        allow(subject)
          .to receive(:scorables).and_return(questions)

        expect(subject.relax).to be_within(0.1).of(avg(3.33))
      end
    end
  end
end
