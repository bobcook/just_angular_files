require 'omniauth'

module OmniAuth
  module Strategies
    class AARP
      include OmniAuth::Strategy

      attr_reader :user_info

      option :fields, [:ut]
      option :uid_field, :email

      uid do
        request.params[options.uid_field.to_s]
      end

      info do
        {
          first_name: user_info[:firstName],
          last_name: user_info[:lastName],
          email: user_info[:email]
        }
      end

      credentials do
        {
          token: user_token
        }
      end

      extra do
        {
          raw_info: user_info
        }
      end

      def request_phase
        referrer = full_host + script_name + callback_path
        response = api.login_from_provider(referrer: referrer)
        redirect response.headers['location']
      end

      def callback_phase
        response = api.user(user_token)
        @user_info = response.body[:user]
        super
      end

      private

      def api
        @api ||= Apis::DSO.endpoints
      end

      def user_token
        request.params['ut']
      end
    end
  end
end
