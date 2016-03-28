module Apis
  module DSO
    class MembershipProductParser
      attr_reader :response

      def self.parse(response)
        new(response).product
      end

      def initialize(response)
        fail UnknownProduct unless response.ok?

        @response = response
      end

      def product
        return 'employee' if employee_product?
        'beta' if beta_product?
      end

      private

      def employee_product?
        match_product(/employee/i)
      end

      def beta_product?
        match_product(/beta/i)
      end

      def match_product(regexp)
        return false if raw_product.nil?
        raw_product.match(regexp).present?
      end

      def raw_product
        @raw_product ||= Hashie::Mash
                         .new(response.body)
                         .getSpecializedMembershipStatus
                         .specializedMembershipStatusList
                         .specializedMembershipStatus
                         .membershipProduct
      end

      class UnknownProduct < RuntimeError
        attr_reader :status_str

        def message
          "Unknown membership prodcut `#{status_str}`"
        end
      end
    end
  end
end
