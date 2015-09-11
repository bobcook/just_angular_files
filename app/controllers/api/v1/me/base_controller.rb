module Api
  module V1
    module Me
      class BaseController < ApplicationController
        # TODO: add some type of user authentication validation
        before_filter :set_cache_control_headers, only: [:index, :show]

        def verified_request?
          super || angular_csrf_header_valid?
        end

        private

        def angular_csrf_header_valid?
          valid_authenticity_token? session, request.headers['X-XSRF-TOKEN']
        end
      end
    end
  end
end
