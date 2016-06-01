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
          membership_status: user_info[:membership_status],
          membership_product: user_info[:membership_product],
          membership_expiration: user_info[:membership_expiration]
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
        fail InvalidLoginResponse unless valid_response?(response)
        redirect redirect_path(response.headers['location'])
      end

      def callback_phase
        user_response = api.user(user_token)
        membership_response = api.specialized_membership_status(user_token)

        @user_info = user_response.body[:user].try do |user_info|
          user_info.merge(
            membership_status: membership_status(membership_response),
            membership_product: membership_product(membership_response),
            membership_expiration: membership_expiration(membership_response)
          )
        end

        super
      end

      private

      def valid_response?(response)
        !response.headers['location'].nil?
      end

      def membership_status(response)
        Apis::DSO::MembershipStatusParser.parse(response)
      end

      def membership_product(response)
        Apis::DSO::MembershipProductParser.parse(response)
      end

      def membership_expiration(response)
        Apis::DSO::MembershipExpirationParser.parse(response)
      end

      def redirect_path(location)
        queries = %w(promo cmp campaignURL)
        "#{location}&#{build_query(queries)}"
      end

      def build_query(queries)
        queries.map do |query|
          param = request.params.fetch(query, '')
          param.empty? ? '' : "#{query}=#{param}"
        end.reject(&:empty?).join('&')
      end

      def api
        @api ||= Apis::DSO.endpoints
      end

      def user_token
        request.params['ut']
      end

      class InvalidLoginResponse < StandardError; end
    end
  end
end
