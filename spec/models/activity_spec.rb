require 'rails_helper'

describe Activity do
  it { should have_many(:pillar_categorizations) }
  it { should have_many(:pillars).through(:pillar_categorizations) }
  it { should belong_to(:activity_tracker) }
  it { should have_many(:user_activities) }

  describe '.for_pillar' do
    before(:each) do
      Pillar.default_types.each do |slug|
        create("#{slug}_pillar")
      end
    end

    it 'returns activities with the given pillar' do
      pillar = Pillar.find_by(slug: Pillar.default_types.first)
      other_pillar = Pillar.find_by(slug: Pillar.default_types.last)

      with_pillar = create_list(:activity, 2, pillars: [pillar])
      create_list(:activity, 1, pillars: [other_pillar])

      expect(described_class.for_pillar(pillar))
        .to match_array(with_pillar)
    end

    it 'works on chained relations' do
      pillar = Pillar.find_by(slug: Pillar.default_types.first)
      other_pillar = Pillar.find_by(slug: Pillar.default_types.last)

      with_pillar = create_list(:activity, 2, points: 2, pillars: [pillar])
      create_list(:activity, 2, points: 1, pillars: [pillar])
      create_list(:activity, 2, points: 2, pillars: [other_pillar])

      relation = described_class.where(points: 2)
      expect(relation.for_pillar(pillar)).to match_array(with_pillar)
    end
  end

  describe '#saved?' do
    it 'returns true if user has saved the activity' do
      user = create(:user)
      activity = create(:activity)
      create(:user_activity, user: user, activity: activity)

      expect(activity.saved?(user)).to eq(true)
    end

    it 'returns false if user has not saved the activity' do
      user = create(:user)
      activity = create(:activity)

      expect(activity.saved?(user)).to eq(false)
    end
  end

  describe '#pillar_names' do
    let!(:keeping_fit_pillar) { create(:keeping_fit_pillar) }
    let!(:being_social_pillar) { create(:being_social_pillar) }
    let!(:learning_more_pillar) { create(:learning_more_pillar) }

    it 'is an array of the names of the associated pillars' do
      expected_pillars = [keeping_fit_pillar, being_social_pillar]
      expected_names = expected_pillars.map(&:name)

      subject = build(:activity, pillars: expected_pillars)
      expect(subject.pillar_names).to match_array(expected_names)
    end

    describe '#displayable_pillar_names' do
      it 'is a comma-separated string of the names of associated pillars' do
        expected_pillars = [learning_more_pillar, being_social_pillar]
        expected_names = expected_pillars.map(&:name).join(' ')

        subject = build(:activity, pillars: expected_pillars)
        expect(subject.displayable_pillar_names).to eq(expected_names)
      end
    end
  end
end
