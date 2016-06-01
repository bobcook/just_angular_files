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
        query_params(token_holder.claim_token)
      )
    end

    def user
      @user ||= User.from_omniauth(auth_data)
    end

    def login_success_redirect_path
      request.env
        .fetch('omniauth.params', {})
        .fetch('redirectPath', '')
    end

    def query_params(claim_token)
      omniauth_params_queries.merge(
        claim_token: claim_token,
        'redirectPath' => login_success_redirect_path
      ).reject { |_k, v| v.empty? }
    end

    def omniauth_params_queries
      %w(promo cmp campaignURL).map do |query|
        [query, request.env.fetch('omniauth.params', {}).fetch(query, '')]
      end.to_h
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
