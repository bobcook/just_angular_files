module Api
  module V1
    module Policies
      class CurrentUsersController < Api::V1::BaseController
        def show
          render json: user_policy.current_user_policy
        end

        def user_policy
          @user_policy ||= UserPolicies.new(current_user)
        end
      end
    end
  end
end
