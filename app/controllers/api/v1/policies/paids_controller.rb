module Api
  module V1
    module Policies
      class PaidsController < Api::V1::BaseController
        def show
          render json: { access: user_policy.paid? }
        end

        private

        def user_policy
          @user_polcy ||= UserPolicies.new(current_user)
        end
      end
    end
  end
end
