module Api
  module V1
    class ArticlesController < Api::V1::BaseController
      def index
        render json: Article.all, each_serializer: ArticleSerializer
      end
    end
  end
end
