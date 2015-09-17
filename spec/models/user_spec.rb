require 'rails_helper'

describe User do
  it 'is omniauthable' do
    expect(described_class).to respond_to(:from_omniauth)
  end

  it { should have_many(:user_activities) }
  it { should have_many(:activities).through(:user_activities) }
  it { should have_many(:user_recipes) }
  it { should have_many(:recipes).through(:user_recipes) }

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
