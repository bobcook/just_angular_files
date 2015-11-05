module Api
  module V1
    module Me
      class ArticlesController < Api::V1::Me::BaseController
        include PaginatedResource
        include SaveableResource

        private

        def resource
          @resource ||= current_user.articles
        end

        def sorted_collection
          @sorted_collection ||= resource.order('user_articles.created_at DESC')
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
