require 'rails_helper'

describe User do
  it 'is omniauthable' do
    expect(described_class).to respond_to(:from_omniauth)
  end

  it { should have_many(:user_activities) }
  it { should have_many(:activities).through(:user_activities) }
  it { should have_many(:user_recipes) }
  it { should have_many(:recipes).through(:user_recipes) }
  it { should have_many(:user_articles) }
  it { should have_many(:articles).through(:user_articles) }
  it { should have_many(:user_games) }
  it { should have_many(:games).through(:user_games) }
  it { should have_many(:user_assessment_groups) }
  it { should have_many(:user_assessments).through(:user_assessment_groups) }

  describe '#max_activity_limit?' do
    limit = 3
    User::MAX_ACTIVITY_LIMIT = limit

    it 'should return false if user has less than the max activity limit' do
      user = create(:user)
      create_list(:user_activity, limit - 1, user: user)
      expect(user.max_activity_limit?).to eq(false)
    end

    it 'should return true if user reached the max activity limit' do
      user = create(:user)
      create_list(:user_activity, limit, user: user)
      expect(user.max_activity_limit?).to eq(true)
    end

    it 'should return true if user has more than the max activity limit' do
      user = create(:user)
      create_list(:user_activity, limit + 1, user: user)
      expect(user.max_activity_limit?).to eq(true)
    end
  end

  describe '#engagement_level' do
    let(:user) { create(:user) }
    let(:user_assessment_group) { create(:user_assessment_group) }

    it 'returns 0 if user has no assessments' do
      user = create(:user)

      expect(user.engagement_level).to eq(0)
    end

    it 'returns 1 if user completed an user assessment' do
      create(:user_assessment,
             user_assessment_group: user_assessment_group,
             completed: true)
      create(:user_assessment,
             user_assessment_group: user_assessment_group,
             completed: false)
      user.user_assessment_groups << user_assessment_group

      expect(user.reload.engagement_level).to eq(1)
    end

    it 'returns 2 if user completed an user assessment group' do
      2.times do
        create(:user_assessment,
               user_assessment_group: user_assessment_group,
               completed: true)
      end
      user.user_assessment_groups << user_assessment_group

      expect(user.reload.engagement_level).to eq(2)
    end

    it 'returns 3 if user completed an user assessment group & an activity' do
      2.times do
        create(:user_assessment,
               user_assessment_group: user_assessment_group,
               completed: true)
      end
      user.user_assessment_groups << user_assessment_group
      user.user_activities << create(:user_activity)

      expect(user.reload.engagement_level).to eq(3)
    end
  end

  describe '#external_id' do
    it 'is the same after multiple saves' do
      subject = create(:user)
      before_save = subject.external_id
      subject.save!
      after_save = subject.external_id

      expect(before_save).to eq(after_save)
    end

    it 'is the same after the email changes' do
      subject = create(:user)
      before_change = subject.external_id
      subject.update(email: 'blahblah@example.com')
      after_change = subject.external_id

      expect(before_change).to eq(after_change)
    end

    it 'is unique per user' do
      subject = create(:user)
      other_subject = create(:user)

      expect(subject.external_id).not_to eq(other_subject.external_id)
    end
  end

  describe 'validations' do
    describe 'user_activities' do
      it 'is valid if there are fewer than MAX_ACTIVITY_LIMIT' do
        user = create(:user)
        user.user_activities << build(:user_activity)

        expect(user).to be_valid
      end

      it 'is valid if there are MAX_ACTIVITY_LIMIT user activities' do
        user = create(:user)
        user.user_activities +=
          create_list(:user_activity, User::MAX_ACTIVITY_LIMIT)
        expect(user).to be_valid
      end

      it 'is invalid if there are more than MAX_ACTIVITY_LIMIT' do
        user = create(:user)
        user.user_activities +=
          create_list(:user_activity, User::MAX_ACTIVITY_LIMIT)
        expect(user).to be_valid

        user.user_activities << build(:user_activity)
        expect(user).to be_invalid
      end
    end
  end
end
