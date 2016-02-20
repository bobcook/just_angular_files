module Api
  module V1
    module Policies
      class PaidsController < Api::V1::BaseController
        def show
          render json: { access: paid_user? }
        end

        private

        def paid_user?
          current_user.present? && current_user.paid?
        end
      end
    end
  end
end
