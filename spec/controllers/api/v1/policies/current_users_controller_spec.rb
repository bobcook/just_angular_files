require 'rails_helper'

module Api
  module V1
    module Policies
      describe CurrentUsersController do
        describe '#show' do
          context 'with paid user' do
            let(:paid_user) { create(:user, membership_status: :paid) }
            before { login_user(paid_user) }

            it 'returns paid user accessble content' do
              get :show

              expect(JSON.parse(response.body)['accessible_content']).to eq(
                %w(Articles Games Activities Recipes)
              )
            end
          end
          context 'with unpaid user' do
            let(:unpaid_user) { create(:user) }
            before { login_user(unpaid_user) }

            it 'returns unpaid user accessble content' do
              get :show

              expect(JSON.parse(response.body)['accessible_content']).to eq(
                %w(Articles Games)
              )
            end
          end
        end
      end
    end
  end
end
