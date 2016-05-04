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
      patch :update, params

      expect(user_assessment.reload.completed).to eq(true)
    end
  end
end
