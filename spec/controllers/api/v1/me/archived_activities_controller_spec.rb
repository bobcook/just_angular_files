require 'rails_helper'

describe Api::V1::Me::ArchivedActivitiesController do
  let(:user) { create(:user) }

  before { sign_in user }

  describe '#index' do
    it 'should only return archived activities' do
      create_list(:user_activity, 4, user: user)
      archived_activities =
        create_list(:user_activity, 3, user: user, archived: true)
      get :index, format: :json
      results = JSON.parse(response.body)['archived_activities']
      result_ids = results.map { |r| r['activity']['id'] }
      archived_ids = archived_activities.map(&:activity_id)
      result_ids.map { |id| expect(archived_ids).to include(id) }
    end
  end
end
