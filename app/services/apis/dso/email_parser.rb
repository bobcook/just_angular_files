module Apis
  module DSO
    class EmailParser
      attr_reader :response

      def self.parse(response)
        new(response).email
      end

      def initialize(response)
        @response = response
      end

      def email
        @email ||=
          response.body
          .fetch(:getSpecializedMembershipInfo, {})
          .fetch(:email, nil)
      end
    end
  end
end
