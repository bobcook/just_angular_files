module Frontend
  module Paths
    FRONTEND_PATHS = {
      login_failure: ->()      { '/callbacks/login-failure' },
      login_success: lambda do |token, redirect_path, promo_code|
        url = "/callbacks/login-success/#{token}"
        redirect = ParamAppender.append_redirect(url, redirect_path)
        ParamAppender.append_promo(redirect, promo_code)
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

    class ParamAppender
      def self.append_promo(url, promo_code)
        promo_code ? add_param(url, 'promo', promo_code) : url
      end

      def self.append_redirect(url, redirect_path)
        redirect_path ? add_param(url, 'redirectPath', redirect_path) : url
      end

      def self.add_param(url, key, value)
        URI(url).query ? "#{url}&#{key}=#{value}" : "#{url}?#{key}=#{value}"
      end
    end
  end
end
