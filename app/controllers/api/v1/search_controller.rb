module Api
  module V1
    class SearchController < Api::V1::BaseController
      include PaginatedResource

      def index
        render json: search_results
      end

      private

      def search_results
        @search_results ||= begin
          return [] if params[:keywords].nil?
          search_query
        end
      end

      def search_query
        Elasticsearch::Model.search(
          {
            query: {
              multi_match: {
                query: params[:keywords],
                fields: [
                  'payload.benefitToBrainHealthpayload.title',
                  'payload.brainHealthPillar',
                  'payload.contentSourceBranding',
                  'payload.description',
                  'payload.howTo',
                  'payload.ingredients',
                  'payload.mastheadTitle',
                  'payload.prep/cookingInstructions',
                  'payload.seoDescription',
                  'payload.seoTitle',
                  'payload.sourceMaterialsCitation',
                  'title'
                ]
              }
            }
          },
          resources
        # NOTE: use results instead of records in order to get the content type
        ).results
      end

      def resources
        case params[:content_type]
        when 'article'
          [Article]
        when 'recipe'
          [Recipe]
        when 'game'
          [Game]
        when 'activity'
          [Activity]
        else
          [Activity, Article, Game, Recipe]
        end
      end
    end
  end
end
