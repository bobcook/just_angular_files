module Frontend
  module Paths
    FRONTEND_PATHS = {
      login_failure: ->()      { '/callbacks/login-failure' },
      login_success: ->(token) { "/callbacks/login-success/#{token}" }
    }

    module_function

    def lookup(key, *args)
      ENV.fetch('FRONTEND_URL') + FRONTEND_PATHS[key].call(*args)
    end
  end
end
