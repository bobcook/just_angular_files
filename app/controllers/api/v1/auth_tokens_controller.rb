module Api
  module V1
    class AuthTokensController < Api::V1::BaseController
      def show
        destroy_expired_tokens!

        if token_holder
          render json: token_holder.auth_token.to_json
          token_holder.destroy!
        else
          render json: { error: 'Invalid claim token' }, status: :unauthorized
        end
      end

      private

      def destroy_expired_tokens!
        ClaimTokenHolder.expired.destroy_all
      end

      def token_holder
        return @token_holder if defined? @token_holder
        @token_holder = ClaimTokenHolder.find_by claim_token: params[:id]
      end
    end
  end
end
