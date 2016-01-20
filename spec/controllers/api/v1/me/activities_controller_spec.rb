require 'rails_helper'

describe Api::V1::Me::ActivitiesController do
  let(:user) { create(:user) }

  before { sign_in user }

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
end
