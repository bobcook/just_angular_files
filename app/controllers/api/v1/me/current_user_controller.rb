module Api
  module V1
    module Me
      class CurrentUserController < Api::V1::Me::BaseController
        skip_before_action :authenticate_user!

        def index
          if user_signed_in?
            render json: current_user
          else
            # This endpoint is called before someone is actually logged in,
            # but the promise needs to be resolved with _something_, so
            # we return :no_content
            head :no_content
          end
        end
      end
    end
  end
end
