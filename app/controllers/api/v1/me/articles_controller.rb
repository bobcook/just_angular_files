module Api
  module V1
    module Me
      class ArticlesController < Api::V1::Me::BaseController
        include PaginatedResource
        include SaveableResource

        private

        def resource
          current_user.articles
        end

        def serializer
          ArticleSerializer
        end

        def saveable_resource_type
          Article
        end
      end
    end
  end
end
