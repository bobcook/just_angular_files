module Api
  module V1
    module Me
      class GamesController < Api::V1::Me::BaseController
        include PaginatedResource

        # TODO: add error handling for destroy and create
        def destroy
          user_game = UserGame.find_by(
            game_id: params[:id], user_id: current_user.id
          )
          user_game.destroy
          head :accepted
        end

        def create
          game = Game.find(params[:game][:game_id])
          current_user.games << game
          head :created
        end

        private

        def resource
          current_user.games
        end

        def serializer
          GameSerializer
        end
      end
    end
  end
end
