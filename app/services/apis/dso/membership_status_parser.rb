module Apis
  module DSO
    class MembershipStatusParser
      STATUSES = %w(paid prospect lead)

      attr_reader :response

      def self.parse(response)
        new(response).status
      end

      def initialize(response)
        fail(UnknownStatus, '') unless response.ok?

        @response = response
      end

      def status
        @status ||= raw_status.try(:downcase).tap do |raw|
          fail(UnknownStatus, raw) unless raw.in?(STATUSES)
        end
      end

      private

      def raw_status
        @raw_status ||= DSO.fetch_response_value(:membershipStatus, response)
      end

      class UnknownStatus < RuntimeError
        attr_reader :status_str

        def initialize(status_str)
          @status_str = status_str
        end

        def message
          "Unknown membership status `#{status_str}`"
        end
      end
    end
  end
end
