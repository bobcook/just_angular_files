module Api
  module V1
    module Me
      class GamesController < Api::V1::Me::BaseController
        include PaginatedResource
        include SaveableResource

        private

        def resource
          @resource ||= current_user.games
        end

        def sorted_collection
          @sorted_collection ||= resource.order('user_games.created_at DESC')
        end

        def serializer
          GameSerializer
        end

        def saveable_resource_type
          Game
        end
      end
    end
  end
end