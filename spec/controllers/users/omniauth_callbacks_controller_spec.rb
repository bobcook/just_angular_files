require 'rails_helper'

describe Users::OmniauthCallbacksController do
  before(:each) do
    # Errors without telling Devise to use the "user" mapping for routes
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  describe '#aarp' do
    context 'when user is persisted' do
      it 'encodes the user id in a JWT' do
        user = create(:user)
        allow(User).to receive(:from_omniauth).and_return(user)
        expect(JsonWebToken).to receive(:encode).and_return(user_id: user.id)

        get :aarp
      end

      it 'redirects to the login success path on the frontend' do
        user = create(:user)
        token_holder = double(claim_token: 'CLAIM_TOKEN')
        allow(User).to receive(:from_omniauth).and_return(user)
        allow(ClaimTokenHolder)
          .to receive(:create_from_auth_token!).and_return(token_holder)
        expected_path =
          Frontend::Paths.lookup(:login_success, token_holder.claim_token)

        get :aarp
        expect(response).to redirect_to(expected_path)
      end
    end

    context 'user is not persisted' do
      it 'redirects to the login failure path on frontend' do
        user = double(persisted?: false)
        allow(User).to receive(:from_omniauth).and_return(user)
        expected_path = Frontend::Paths.lookup(:login_failure)

        get :aarp
        expect(response).to redirect_to(expected_path)
      end
    end
  end
end
