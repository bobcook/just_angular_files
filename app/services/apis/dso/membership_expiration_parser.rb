module Apis
  module DSO
    class MembershipExpirationParser
      attr_reader :response

      def self.parse(response)
        new(response).expire
      end

      def initialize(response)
        fail DSO::BadDSOResponse unless response.ok?

        @response = response
      end

      def expire
        return raw_expire.to_datetime if raw_expire
      end

      private

      def raw_expire
        @raw_expire ||=
          DSO.fetch_response_value(:membershipExpirationDate, response)
      end
    end
  end
end
