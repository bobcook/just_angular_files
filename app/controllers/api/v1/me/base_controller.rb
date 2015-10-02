module Api
  module V1
    module Me
      class BaseController < ApplicationController
        before_filter :set_cache_control_headers, only: [:index, :show]
      end
    end
  end
end
