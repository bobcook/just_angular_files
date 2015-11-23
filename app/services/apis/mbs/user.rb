# MBS needs unique user data, but AARP wants to dissociate actual
# user data from assessment results. This wrapper class allows for both
# via dummy fields that are unique per-user
module Apis
  module MBS
    class User
      def self.for_user_model(user)
        new(
          orig_id: user.id,
          orig_email: user.email,
          external_id: user.external_id
        )
      end

      attr_reader :attrs

      delegate :orig_id, :orig_email, :external_id, to: :attrs

      def initialize(attrs = {})
        @attrs = OpenStruct.new(attrs)
      end

      def id
        @id ||= email_digest
      end

      # Use the MD5 hash of the user's email, which should
      # still be consistent across dev / staging / prod,
      # unlike IDs
      def email
        @email ||= "user#{email_digest}@example.com"
      end

      def first_name
        @first_name ||= 'AARP'
      end

      def last_name
        @last_name ||= 'Member'
      end

      private

      def email_digest
        @email_digest ||= external_id || Digest::MD5.hexdigest(orig_email)
      end
    end
  end
end
