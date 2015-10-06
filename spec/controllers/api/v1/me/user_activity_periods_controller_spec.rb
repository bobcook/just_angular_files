require 'rails_helper'

describe Api::V1::Me::UserActivityPeriodsController do
  describe 'PATCH #update' do
    let(:user) { create :user }
    let(:user_activity) { create :user_activity, user: user }

    let(:params) do
      questions = user_activity.activity.activity_tracker
                  .activity_tracker_questions

      {
        id: '2015-10-01',
        user_activity_period: {
          user_activity_id: user_activity.id,
          activity_tracker_responses: questions.map do |question|
            {
              activity_tracker_question_id: question.id,
              response: 1
            }
          end
        }
      }
    end

    before { sign_in user }

    it 'creates a user activity period if it does not yet exist' do
      expect { patch :update, params }
        .to change { UserActivityPeriod.count }.by 1
    end
  end
end
