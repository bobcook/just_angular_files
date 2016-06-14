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

        def update
          if user_signed_in?
            current_user.update(last_seen_at: last_seen_at)
            render json: current_user
          else
            head :unprocessable_entity
          end
        end

        # angular-rails-resource does not yet support singular resources
        # this alias can be removed when this functionality is released:
        # https://github.com/FineLinePrototyping/angularjs-rails-resource/tree/bbcfbcc816429bc348b825b526de06da0f0bd447
        alias_method :show, :index

        private

        def last_seen_at
          @last_seen_at ||=
            Time.zone.at(params[:user][:last_seen_at].to_i)
        end
      end
    end
  end
end
