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
        allow_any_instance_of(EngagementEmails).to receive(:send_later)
        expect(JsonWebToken).to receive(:encode).and_return(user_id: user.id)

        get :aarp
      end

      it 'redirects to the login success path on the frontend' do
        user = create(:user, membership_status: :paid)
        token_holder = double(claim_token: 'CLAIM_TOKEN')
        allow(User).to receive(:from_omniauth).and_return(user)
        allow(ClaimTokenHolder)
          .to receive(:create_from_auth_token!).and_return(token_holder)
        allow_any_instance_of(EngagementEmails).to receive(:send_later)
        expected_path =
          Frontend::Paths.lookup(
            :login_success,
            token_holder.claim_token,
            nil,
            nil
          )

        get :aarp
        expect(response).to redirect_to(expected_path)
      end

      it 'creates an engagement email' do
        user = create(:user, last_sign_in_at: Time.now)
        allow(User).to receive(:from_omniauth).and_return(user)
        email = double
        allow(EngagementEmails).to receive(:new).and_return(email)

        expect(email).to receive(:send_later)
        get :aarp
      end

      it 'creates an engagement email for first time logins' do
        user = create(:user, last_sign_in_at: nil)
        allow(User).to receive(:from_omniauth).and_return(user)
        http = double
        allow(http).to receive(:post)
        email = EngagementEmails.new(user, http: http)
        allow_any_instance_of(EngagementEmails)
          .to receive(:send_later).and_return(email)

        expect { email.send }.to_not raise_error
        get :aarp
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

      it 'logs an error to Airbrake' do
        user = double(persisted?: false)
        allow(User).to receive(:from_omniauth).and_return(user)

        expect_any_instance_of(Users::OmniauthCallbacksController)
          .to receive(:notify_airbrake)

        get :aarp
      end
    end
  end
end
