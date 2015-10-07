module Api
  module V1
    module Articles
      class ReviewsController < Api::V1::BaseController
        def create
          current_user.reviews.create(
            reviewable: article,
            recommend: params[:review][:recommend],
            comment: params[:review][:comment]
          )
          head :created
        end

        def index
          render json: article.reviews, each_serializer: ArticleReviewSerializer
        end

        private

        def article
          Article.find(params[:article_id])
        end
      end
    end
  end
end
