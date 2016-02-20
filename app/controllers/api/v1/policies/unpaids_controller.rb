module Api
  module V1
    module Policies
      class UnpaidsController < Api::V1::BaseController
        def show
          render json: { access: unpaid_user? }
        end

        private

        def unpaid_user?
          current_user.nil? || !current_user.paid?
        end
      end
    end
  end
end
