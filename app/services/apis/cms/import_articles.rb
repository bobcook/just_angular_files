module Apis
  module CMS
    class ImportArticles
      def import
        recent_articles.each do |article|
          ImportArticleJob.perform_later(article)
        end
      end

      private

      def recent_articles
        RecentArticles.new.fetch
      end
    end
  end
end
