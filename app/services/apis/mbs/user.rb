# MBS needs unique user data, but AARP wants to dissociate actual
# user data from assessment results. This wrapper class allows for both
# via dummy fields that are unique per-user
module Apis
  module Mbs
    class User
      def self.for_user_model(user)
        new(id: user.id)
      end

      attr_reader :attrs

      delegate :id, to: :attrs

      def initialize(attrs = {})
        @attrs = OpenStruct.new(attrs)
      end

      def email
        @email ||= "user#{id}@example.com"
      end

      def first_name
        @first_name ||= 'AARP'
      end

      def last_name
        @last_name ||= 'Member'
      end
    end
  end
end
