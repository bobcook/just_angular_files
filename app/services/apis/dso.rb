module Apis
  module DSO
    def self.endpoints(options = {})
      Endpoints.new(options)
    end
  end
end
