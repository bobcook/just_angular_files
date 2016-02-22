module Api
  module V1
    module Policies
      class UnpaidsController < Api::V1::BaseController
        def show
          render json: { access: user_policy.unpaid? }
        end

        private

        def user_policy
          @user_polcy ||= UserPolicies.new(current_user)
        end
      end
    end
  end
end
