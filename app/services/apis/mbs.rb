module Apis
  module MBS
    def self.endpoints(options = {})
      Endpoints.new(options)
    end
  end
end
