module Api
  module V1
    module Games
      class ReviewsController < Api::V1::BaseController
        def create
          current_user.reviews.create(
            reviewable: game,
            recommend: params[:review][:recommend],
            comment: params[:review][:comment]
          )
          head :created
        end

        def index
          render json: game.reviews, each_serializer: ReviewSerializer
        end

        private

        def game
          Game.find(params[:game_id])
        end
      end
    end
  end
end
