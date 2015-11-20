require 'rails_helper'

module ImportContent
  describe PillarMapping do
    def make_subject
      PillarMapping
    end

    describe '::new_slug' do
      it 'returns the correct mapping for the keeping_fit slug' do
        old_slug = 'keeping_fit'
        expected_slug = 'move'
        subject = make_subject

        expect(subject.new_slug(old_slug)).to eq(expected_slug)
      end

      it 'returns the correct mapping for the learning_more slug' do
        old_slug = 'learning_more'
        expected_slug = 'discover'
        subject = make_subject

        expect(subject.new_slug(old_slug)).to eq(expected_slug)
      end

      it 'returns the correct mapping for the managing_stress slug' do
        old_slug = 'managing_stress'
        expected_slug = 'relax'
        subject = make_subject

        expect(subject.new_slug(old_slug)).to eq(expected_slug)
      end

      it 'returns the correct mapping for the eating_right slug' do
        old_slug = 'eating_right'
        expected_slug = 'nourish'
        subject = make_subject

        expect(subject.new_slug(old_slug)).to eq(expected_slug)
      end

      it 'returns the correct mapping for the being_social slug' do
        old_slug = 'being_social'
        expected_slug = 'connect'
        subject = make_subject

        expect(subject.new_slug(old_slug)).to eq(expected_slug)
      end
    end

    describe '::new_name' do
      it 'returns the correct mapping for "Keeping Fit"' do
        old_name = 'Keeping Fit'
        expected_name = 'MOVE'
        subject = make_subject

        expect(subject.new_name(old_name)).to eq(expected_name)
      end

      it 'returns the correct mapping for "Learning More"' do
        old_name = 'Learning More'
        expected_name = 'DISCOVER'
        subject = make_subject

        expect(subject.new_name(old_name)).to eq(expected_name)
      end

      it 'returns the correct mapping for "Managing Stress"' do
        old_name = 'Managing Stress'
        expected_name = 'RELAX'
        subject = make_subject

        expect(subject.new_name(old_name)).to eq(expected_name)
      end

      it 'returns the correct mapping for "Eating Right"' do
        old_name = 'Eating Right'
        expected_name = 'NOURISH'
        subject = make_subject

        expect(subject.new_name(old_name)).to eq(expected_name)
      end

      it 'returns the correct mapping for "Being Social"' do
        old_name = 'Being Social'
        expected_name = 'CONNECT'
        subject = make_subject

        expect(subject.new_name(old_name)).to eq(expected_name)
      end
    end

    describe '::old_name' do
      it 'returns an old name when passed a new name' do
        new_name = 'CONNECT'
        expected_name = 'Being Social'
        subject = make_subject

        expect(subject.old_name(new_name)).to eq(expected_name)
      end

      it 'returns the given value when passed an old name' do
        old_name = 'Being Social'
        expected_name = old_name
        subject = make_subject

        expect(subject.old_name(old_name)).to eq(expected_name)
      end
    end
  end
end
