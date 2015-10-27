module Api
  module V1
    class GamesController < Api::V1::BaseController
      include PaginatedResource

      private

      def resource
        Game
      end

      def serializer
        GameSerializer
      end
    end
  end
end
