require 'rails_helper'

describe EngagementEmails do
  let(:user) { create(:user) }
  let(:email) { EngagementEmails.new(user) }

  describe '#update_assessment_status?' do
    it 'returns false if user has zero assessment groups' do
      expect(email.update_assessment_status?).to eq(false)
    end

    it 'returns true if user has one assessment group' do
      user.user_assessment_groups << create(:user_assessment_group)

      expect(email.update_assessment_status?).to eq(true)
    end

    it 'returns false if user has more than one assessment group' do
      2.times do
        user.user_assessment_groups << create(:user_assessment_group)
      end

      expect(email.update_assessment_status?).to eq(false)
    end
  end

  describe '#update_activity_status?' do
    context 'user has zero completed assessment groups' do
      it 'returns false' do
        user_assessment_group = create(:user_assessment_group)
        user_assessment_group.user_assessments <<
          create(:user_assessment, completed: false)
        user.user_assessment_groups << user_assessment_group

        expect(email.update_activity_status?).to eq(false)
      end
    end

    context 'user has a completed assessment group' do
      before(:each) do
        user_assessment_group = create(:user_assessment_group)
        user_assessment_group.user_assessments <<
          create(:user_assessment, completed: true)
        user.user_assessment_groups << user_assessment_group
      end

      it 'returns false if user has zero activities' do
        expect(email.update_activity_status?).to eq(false)
      end

      it 'returns true if user has one activity' do
        user.user_activities << create(:user_activity)

        expect(email.update_activity_status?).to eq(true)
      end

      it 'returns false if user has more than one activity' do
        2.times do
          user.user_activities << create(:user_activity)
        end

        expect(email.update_activity_status?).to eq(false)
      end
    end
  end
end
