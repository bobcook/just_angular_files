require 'rails_helper'

describe Api::V1::Me::AssessmentGroupsController do
  let(:user) { create :user }

  before { sign_in user }

  describe '#create' do
    it 'creates a user assessment group for user' do
      expect { post :create }.to change {
        user.reload.user_assessment_groups.length
      }.by(1)
    end

    context 'if assessment status should be updated' do
      it 'sends an engagement email' do
        email = double
        allow(EngagementEmails).to receive(:new).and_return(email)
        allow(email).to receive(:update_assessment_status?).and_return(true)

        expect(email).to receive(:send_later)
        post :create
      end
    end

    context 'if assessment statys should not be updated' do
      it 'does not send an engagement email' do
        email = double
        allow(EngagementEmails).to receive(:new).and_return(email)
        allow(email).to receive(:update_assessment_status?).and_return(false)

        expect(email).not_to receive(:send_later)
        post :create
      end
    end
  end
end
