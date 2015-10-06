module Api
  module V1
    module Me
      class ArticlesController < Api::V1::Me::BaseController
        def index
          render json: current_user.articles, each_serializer: ArticleSerializer
        end

        def show
          article = UserArticle.find_by(
            article_id: params[:id], user_id: current_user.id
          )
          render json: article || {}
        end

        def create
          article = Article.find(params[:article][:id])
          current_user.articles << article
          head :created
        end
      end
    end
  end
end
