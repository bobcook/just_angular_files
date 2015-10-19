require 'rails_helper'
require_relative './with_pillars_shared_examples'

describe Activity do
  it { should have_many(:pillar_categorizations) }
  it { should have_many(:pillars).through(:pillar_categorizations) }
  it { should belong_to(:activity_tracker) }
  it { should have_many(:user_activities) }

  it_behaves_like 'it fulfills the WithPillars interface', :activity

  describe '#saved?' do
    it 'returns true if user has saved the activity' do
      user = create(:user)
      subject = create(:activity)
      create(:user_activity, user: user, activity: subject)

      expect(subject.saved?(user)).to eq(true)
    end

    it 'returns false if user has not saved the activity' do
      user = create(:user)
      subject = create(:activity)

      expect(subject.saved?(user)).to eq(false)
    end
  end
end
