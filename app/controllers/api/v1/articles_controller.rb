module Api
  module V1
    class ArticlesController < Api::V1::BaseController
      def index
        render json: Article.all, each_serializer: ArticleSerializer
      end

      def show
        render json: Article.find(params[:id])
      end
    end
  end
end
