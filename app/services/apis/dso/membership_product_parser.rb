module Apis
  module DSO
    class MembershipProductParser
      attr_reader :response

      def self.parse(response)
        new(response).product
      end

      def initialize(response)
        fail DSO::BadDSOResponse unless response.ok?

        @response = response
      end

      def product
        @product ||= DSO.fetch_response_value(:membershipProduct, response)
      end
    end
  end
end
