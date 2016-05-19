module Frontend
  module Paths
    FRONTEND_PATHS = {
      login_failure: ->()      { '/callbacks/login-failure' },
      login_success: lambda do |params|
        claim_token = params.delete(:claim_token)
        url = "/callbacks/login-success/#{claim_token}"
        return "#{url}?" + params.map { |k, v| "#{k}=#{v}" }.join('&')
      end,
      assessments: lambda do |slug, completed_id|
        "/assessment/#{slug}?completed=#{completed_id}"
      end,
      assessments_results: -> () { '/assessments-results' }
    }

    module_function

    def lookup(key, *args)
      ENV.fetch('FRONTEND_URL') + FRONTEND_PATHS[key].call(*args)
    end
  end
end
