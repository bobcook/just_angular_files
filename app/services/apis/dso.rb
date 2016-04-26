module Apis
  module DSO
    def self.endpoints(options = {})
      Endpoints.new(options)
    end

    def self.fetch_response_value(value, response)
      user_status = self.user_status(response)
      if user_status.is_a?(Array)
        user_status.find(&method(:staying_sharp)).fetch(value, nil)
      else
        user_status.fetch(value, nil)
      end
    end

    def self.staying_sharp(status)
      status[:membershipType] == 'StayingSharp'
    end

    def self.user_status(response)
      response.body.with_indifferent_access
        .fetch(:getSpecializedMembershipStatus, {})
        .fetch(:specializedMembershipStatusList, {})
        .fetch(:specializedMembershipStatus, {})
    end

    class BadDSOResponse < RuntimeError
      def message
        'Malformed response from DSO'
      end
    end
  end
end
