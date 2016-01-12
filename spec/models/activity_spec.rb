require 'rails_helper'
require_relative './publishable_shared_examples'
require_relative './with_pillars_shared_examples'
require_relative './elasticsearch_shared_examples'

describe Activity do
  it { should have_many(:pillar_categorizations) }
  it { should have_many(:pillars).through(:pillar_categorizations) }
  it { should belong_to(:activity_tracker) }
  it { should have_many(:user_activities) }
  it { should have_many(:reviews) }

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

  describe '#last_modified' do
    it_behaves_like(
      'it defaults to the current time',
      :activity,
      :last_modified
    )
  end

  describe '#published_at' do
    it_behaves_like(
      'it defaults to the current time',
      :activity,
      :published_at
    )
  end

  it_behaves_like 'it calls ElasticsearchIndexer', :activity
end
