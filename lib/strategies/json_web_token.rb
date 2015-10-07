module Strategies
  class JsonWebToken < Devise::Strategies::Base
    def valid?
      request.headers['Authorization'].present? ||
        request.params['authToken'].present?
    end

    def authenticate!
      return fail! unless claims && resource
      success! resource
    end

    private

    def claims
      return @claims if defined? @claims
      @claims =
        begin
          auth_token && ::JsonWebToken.decode(auth_token)
        rescue
          nil
        end
    end

    def auth_token
      request.headers['Authorization'].try { |s| s.split(' ').last } ||
        request.params['authToken']
    end

    def resource
      return @resource if defined? @resource
      @resource = mapping.to.find_by_id(claims["#{mapping.name}_id"])
    end
  end
end
