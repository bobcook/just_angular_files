require 'omniauth'

module OmniAuth
  module Strategies
    class AARP
      include OmniAuth::Strategy

      attr_reader :user_info

      option :fields, [:ut]
      option :uid_field, :external_id

      uid do
        request.params[options.uid_field.to_s]
      end

      info do
        # TODO: change external_id if it isn't canonical
        {
          external_id: user_info[:idpId],
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
        redirect_path =
          response.headers['location'] + "&promo=#{promo_code_for_url}"
        redirect redirect_path
      end

      def callback_phase
        response = api.user(user_token)
        @user_info = response.body[:user]
        super
      end

      private

      def promo_code_for_url
        # TODO: based on vanity URL used, will eventually need to
        # use different promo codes:
        #
        # SM-SS: normal traffic?
        # SS-EMPLOYEE: employees?
        # SS-BETA: beta users?
        request.params['promo']
      end

      def api
        @api ||= Apis::DSO.endpoints
      end

      def user_token
        request.params['ut']
      end
    end
  end
end
