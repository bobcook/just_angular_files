module Api
  module V1
    module Me
      class ArticlesController < Api::V1::Me::BaseController
        include PaginatedResource

        # TODO: add error handling for destroy and create
        def destroy
          user_article = UserArticle.find_by(
            article_id: params[:id], user_id: current_user.id
          )
          user_article.destroy
          head :accepted
        end

        def create
          article = Article.find(params[:article][:article_id])
          current_user.articles << article
          head :created
        end

        private

        def resource
          current_user.articles
        end

        def serializer
          ArticleSerializer
        end
      end
    end
  end
end
