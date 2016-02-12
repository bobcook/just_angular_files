module Frontend
  module Paths
    FRONTEND_PATHS = {
      login_failure: ->()      { '/callbacks/login-failure' },
      login_success: lambda do |token, redirect_path|
        url = "/callbacks/login-success/#{token}"
        redirect_path ? "#{url}?redirectPath=#{redirect_path}" : url
      end,
      unpaid_login_success: lambda do |token|
        "/callbacks/unpaid-login-success/#{token}"
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
