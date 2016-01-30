module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def aarp
      if user.persisted?
        engagement_email(user).send_later

        token_holder = create_token_holder_for! user
        redirect_to redirect_path(token_holder)
      else
        redirect_to Frontend::Paths.lookup(:login_failure)
      end
    end

    private

    def redirect_path(token_holder)
      if user.paid?
        Frontend::Paths.lookup(:login_success, token_holder.claim_token)
      else
        Frontend::Paths.lookup(:unpaid_login_success, token_holder.claim_token)
      end
    end

    def user
      @user ||= User.from_omniauth(request.env['omniauth.auth'])
    end

    def create_token_holder_for!(user)
      ClaimTokenHolder.create_from_auth_token!(UserJwt.for(user))
    end

    def engagement_email(user)
      EngagementEmails.new(user)
    end
  end
end
