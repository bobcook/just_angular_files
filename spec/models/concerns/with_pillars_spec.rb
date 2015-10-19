require 'rails_helper'

describe WithPillars do
  let(:test_class) do
    Activity
  end

  let(:test_factory) do
    test_class.name.downcase.to_sym
  end

  def make_subject(args = {})
    create(test_factory, args)
  end

  def make_multiple(num, args = {})
    num.times.map { make_subject(args) }
  end

  describe '.for_pillar' do
    before(:each) do
      Pillar.default_types.each do |slug|
        create("#{slug}_pillar")
      end
    end

    it 'returns activities with the given pillar' do
      pillar = Pillar.find_by(slug: Pillar.default_types.first)
      other_pillar = Pillar.find_by(slug: Pillar.default_types.last)

      with_pillar = make_multiple(2, pillars: [pillar])
      make_multiple(1, pillars: [other_pillar])

      expect(test_class.for_pillar(pillar))
        .to match_array(with_pillar)
    end

    # TODO: figure out how to make more generic
    it 'works on chained relations' do
      pillar = Pillar.find_by(slug: Pillar.default_types.first)
      other_pillar = Pillar.find_by(slug: Pillar.default_types.last)

      with_pillar = make_multiple(2, points: 2, pillars: [pillar])
      make_multiple(2, points: 1, pillars: [pillar])
      make_multiple(2, points: 2, pillars: [other_pillar])

      relation = test_class.where(points: 2)
      expect(relation.for_pillar(pillar)).to match_array(with_pillar)
    end
  end

  context 'with specific pillars' do
    let!(:keeping_fit_pillar) { create(:keeping_fit_pillar) }
    let!(:being_social_pillar) { create(:being_social_pillar) }
    let!(:learning_more_pillar) { create(:learning_more_pillar) }

    describe '#pillar_names' do
      it 'is an array of the names of the associated pillars' do
        expected_pillars = [keeping_fit_pillar, being_social_pillar]
        expected_names = expected_pillars.map(&:name)

        subject = make_subject(pillars: expected_pillars)
        expect(subject.pillar_names).to match_array(expected_names)
      end
    end

    describe '#pillar_slugs' do
      it 'is an array of the slugs of the associated pillars' do
        expected_pillars = [keeping_fit_pillar, being_social_pillar]
        expected_slugs = expected_pillars.map(&:slug)

        subject = make_subject(pillars: expected_pillars)
        expect(subject.pillar_slugs).to match_array(expected_slugs)
      end
    end

    describe '#displayable_pillar_names' do
      it 'is a comma-separated string of the names of associated pillars' do
        expected_pillars = [learning_more_pillar, being_social_pillar]
        expected_names = expected_pillars.map(&:name).join(' ')

        subject = make_subject(pillars: expected_pillars)
        expect(subject.displayable_pillar_names).to eq(expected_names)
      end
    end
  end
end
