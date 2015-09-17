module Apis
  class Response
    include CollectionUtils

    attr_reader :status, :body, :headers

    def self.from_faraday(faraday_response)
      new(
        status: faraday_response.status,
        body: faraday_response.body,
        headers: faraday_response.headers
      )
    end

    def initialize(args = {})
      body = args[:body]
      @status = args[:status]
      @body = body.is_a?(Hash) ? body.with_indifferent_access : body
      @headers = (args[:headers] || {}).with_indifferent_access
    end

    def merge!(hash = {})
      tap { body.merge!(hash) }
    end

    def method_missing(method_sym, *arguments, &block)
      method_name = method_sym.to_s.delete('?').to_sym
      if respond_to?(method_name)
        response_values[method_name] == status
      else
        super
      end
    end

    def respond_to?(method_sym, include_private = false)
      response_values.keys.include?(method_sym) || super
    end

    private

    attr_writer :body

    def response_codes
      map_values(Rack::Utils::HTTP_STATUS_CODES) do |value|
        value.parameterize.underscore.to_sym
      end
    end

    def response_values
      response_codes.invert
    end
  end
end
