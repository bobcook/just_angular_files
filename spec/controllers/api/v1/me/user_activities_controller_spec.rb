require 'rails_helper'

describe Api::V1::Me::UserActivitiesController do
  describe 'GET #show' do
    let(:user) { create :user }
    let(:user_activity) { create :user_activity, user: user }

    before { sign_in user }

    it 'returns the associated activity at the root' do
      get :show, id: user_activity.id
      body = JSON.parse response.body
      expect(body['activity']['id']).to eq user_activity.activity.id
    end

    it 'embeds user activity periods' do
      get :show, id: user_activity.id
      body = JSON.parse response.body
      expect(body['activity']).to include 'user_activity_periods'
    end
  end
end
