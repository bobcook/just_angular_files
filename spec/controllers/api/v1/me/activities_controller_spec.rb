require 'rails_helper'

describe Api::V1::Me::ActivitiesController do
  let(:user) { create(:user) }

  before { sign_in user }

  describe '#index' do
    it 'should only return unarchived activities' do
      unarchived_activities = create_list(:user_activity, 4, user: user)
      create_list(:user_activity, 3, user: user, archived: true)
      get :index, format: :json
      results = JSON.parse(response.body)['activities']
      result_ids = results.map { |r| r['activity']['id'] }
      nonarchived_ids = unarchived_activities.map(&:activity_id)
      result_ids.map { |id| expect(nonarchived_ids).to include(id) }
    end
  end

  describe '#create' do
    context 'under max number of activities' do
      it 'should return created' do
        activity = create(:activity)
        post :create, activity: { activity_id: activity.id }
        expect(response).to have_http_status(:created)
      end

      context 'if update_activity_status? is true' do
        it 'sends an email' do
          email = double
          activity = create(:activity)
          allow(EngagementEmails).to receive(:new).and_return(email)
          allow(email).to receive(:update_activity_status?).and_return(true)

          expect(email).to receive(:send_later)
          post :create, activity: { activity_id: activity.id }
        end
      end

      context 'if update_activity_status? is false' do
        it 'does not send an email' do
          new_activity = create(:activity)
          email = double
          allow(EngagementEmails).to receive(:new).and_return(email)
          allow(email).to receive(:update_activity_status?).and_return(false)

          post :create, activity: { activity_id: new_activity.id }
          expect(email).not_to receive(:send_later)
        end
      end
    end

    context 'at max number of activities' do
      it 'should return no content' do
        max_activitites_count =
          Api::V1::Me::ActivitiesController::MAX_ACTIVITIES_COUNT

        create_list(:user_activity, max_activitites_count, user: user)

        post :create
        expect(response).to have_http_status(:no_content)
      end
    end
  end

  describe '#update' do
    let!(:activity) { create(:activity) }
    let!(:user_activity) do
      create(:user_activity, user: user, activity: activity)
    end
    let(:params) do
      {
        activity: {
          archived: true
        },
        id: activity.id
      }
    end

    it 'updates the archived value' do
      put :update, params

      expect(user_activity.reload.archived).to eq(true)
    end
  end
end
