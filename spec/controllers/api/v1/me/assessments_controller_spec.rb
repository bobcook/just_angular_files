require 'rails_helper'

describe Api::V1::Me::AssessmentsController do
  let(:user) { create :user }
  let(:user_assessment_group) { create(:user_assessment_group, user: user) }
  let(:user_assessment) do
    create(:user_assessment,
           completed: false, user_assessment_group: user_assessment_group)
  end

  before { sign_in user }

  describe '#show' do
    it 'returns one user assessment' do
      get :show, id: user_assessment.id

      expect(response).to have_http_status(200)
    end
  end

  describe '#update' do
    let(:params) do
      {
        user_assessment: {
          completed: true
        },
        id: user_assessment.id
      }
    end

    it 'updates the user assessment' do
      allow_any_instance_of(EngagementEmails).to receive(:send_later)
      patch :update, params

      expect(user_assessment.reload.completed).to eq(true)
    end

    context 'if update_assessment_status? is true' do
      it 'sends an engagment email' do
        email = double
        allow(EngagementEmails).to receive(:new).and_return(email)
        allow(email).to receive(:update_assessment_status?).and_return(true)

        expect(email).to receive(:send_later)
        patch :update, params
      end
    end

    context 'if update_assessment_status? is false' do
      it 'does not send engagement email' do
        email = double
        allow(EngagementEmails).to receive(:new).and_return(email)
        allow(email).to receive(:update_assessment_status?).and_return(false)

        expect(email).not_to receive(:send_later)
        patch :update, params
      end
    end
  end
end
