module Api
  module V1
    class SearchController < Api::V1::BaseController
      def index
        render json: {
          items: ActiveModel::ArraySerializer.new(
            search_results, each_serializer: SearchResultsSerializer),
          # return total_count for frontend pagination
          total_count: search_results.total_count
        }
      end

      private

      def search_results
        @search_results ||= begin
          return [] if params[:keywords].nil?
          paginated_results
        end
      end

      def per_page
        I18n.t('config.pagination.search_per_page')
      end

      def paginated_results
        search_query.page(params[:page]).per(per_page).records
      end

      def search_query
        Elasticsearch::Model.search(query_string, resources)
      end

      def query_string
        params[:pillar].nil? ? match_query : match_query.merge(filter_query)
      end

      def match_query
        {
          query: {
            multi_match: {
              query: params[:keywords],
              type: 'best_fields',
              fields: [
                'payload.benefitToBrainHealth',
                'payload.cardTitle^2',
                'payload.contentSourceBranding',
                'payload.description',
                'payload.howTo',
                'payload.ingredients',
                'payload.mastheadTitle',
                'payload.prep/cookingInstructions',
                'payload.seoDescription',
                'payload.seoTitle',
                'payload.sourceMaterialsCitation',
                'title^2'
              ],
              'operator': 'and'
            }
          }
        }
      end

      def selected_pillar
        pillar = params[:pillar]
        new_name = ImportContent::PillarMapping.new_name(pillar).downcase
        pillar.downcase.split.push(new_name)
      end

      def filter_query
        {
          filter: {
            terms: { 'payload.brainHealthPillar': selected_pillar }
          }
        }
      end

      def resources
        case params[:content_type]
        when 'articles'
          [Article]
        when 'recipes'
          [Recipe]
        when 'games'
          [Game]
        when 'activities'
          [Activity]
        else
          [Activity, Article, Game, Recipe]
        end
      end
    end
  end
end
