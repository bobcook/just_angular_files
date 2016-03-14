module Api
  module V1
    class FreeGamesController < Api::V1::BaseController
      include PaginatedResource

      private

      def resource
        Game.where("payload ->> 'gameType'= 'Free'")
      end

      def serializer
        GameSerializer
      end
    end
  end
end
