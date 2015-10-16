module Api
  module V1
    class ArticlesController < Api::V1::BaseController
      include PaginatedResource

      private

      def resource
        Article
      end

      def serializer
        ArticleSerializer
      end
    end
  end
end
