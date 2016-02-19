module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def aarp
      if user.persisted?
        engagement_email(user).send_later

        token_holder = create_token_holder_for! user
        redirect_to redirect_path(token_holder)
      else
        notify_airbrake(BadOmniauthData.new(auth_data))
        redirect_to Frontend::Paths.lookup(:login_failure)
      end
    end

    private

    def redirect_path(token_holder)
      Frontend::Paths.lookup(
        :login_success,
        token_holder.claim_token,
        login_success_redirect_path
      )
    end

    def user
      @user ||= User.from_omniauth(auth_data)
    end

    def login_success_redirect_path
      request.env
        .fetch('omniauth.params', {})
        .fetch('redirectPath', nil)
    end

    def auth_data
      @auth_data ||= request.env['omniauth.auth']
    end

    def create_token_holder_for!(user)
      ClaimTokenHolder.create_from_auth_token!(UserJwt.for(user))
    end

    def engagement_email(user)
      EngagementEmails.new(user)
    end

    class BadOmniauthData < RuntimeError
      attr_reader :omniauth_data

      def initialize(omniauth_data)
        @omniauth_data = omniauth_data
      end

      def message
        'Could not create or modify User due to bad omniauth data: ' \
        "#{omniauth_data}"
      end
    end
  end
end
