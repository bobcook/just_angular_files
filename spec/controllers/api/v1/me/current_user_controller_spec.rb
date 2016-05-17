require 'rails_helper'

module Api
  module V1
    module Me
      describe CurrentUserController do
        let(:user) { create(:user) }
        before { sign_in(user) }

        describe 'PUT #update' do
          it 'updates last_seen_at' do
            current_time = Time.zone.now.change(usec: 0)
            params = {
              id: user.id,
              user: { last_seen_at: current_time.to_i }
            }
            put :update, params, format: :json

            expect(user.reload.last_seen_at).to eq(current_time)
          end
        end
      end
    end
  end
end
