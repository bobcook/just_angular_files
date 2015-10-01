module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def aarp
      if user.persisted?
        token_holder = create_token_holder_for! user
        path = Frontend::Paths.lookup(:login_success, token_holder.claim_token)
        redirect_to path
      else
        redirect_to Frontend::Paths.lookup(:login_failure)
      end
    end

    private

    def user
      @user ||= User.from_omniauth(request.env['omniauth.auth'])
    end

    def create_token_holder_for!(user)
      ClaimTokenHolder.create_from_auth_token!(jwt_for user)
    end

    def jwt_for(user)
      JsonWebToken.encode 'user_id' => user.id
    end
  end
end
