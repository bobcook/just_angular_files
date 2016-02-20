require 'rails_helper'

module Api
  module V1
    module Policies
      describe UnpaidsController do
        describe '#show' do
          context 'for paid user' do
            let(:user) { create(:user, membership_status: :paid) }
            before { login_user(user) }

            it 'returns false' do
              get :show

              expect(JSON.parse(response.body)['access']).to eq(false)
            end
          end
          context 'for unpaid user' do
            it 'returns true' do
              get :show

              expect(JSON.parse(response.body)['access']).to eq(true)
            end
          end
        end
      end
    end
  end
end
