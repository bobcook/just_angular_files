module Api
  module V1
    class SearchController < Api::V1::BaseController
      def index
        render json: {
          items: ActiveModel::ArraySerializer.new(
            search_results, each_serializer: SearchResultsSerializer),
          # return total_count for frontend pagination
          total_count: search_query.count
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
        match_query.merge(filter_query)
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
                'payload.section1Body',
                'payload.section2Body',
                'payload.contentSourceBrandingImageDescription',
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

      def games_filter
        {
          bool: {
            should: [
              {
                missing: {
                  field: 'payload.gameType'
                }
              },
              {
                term: {
                  'payload.gameType': 'free'
                }
              }
            ]
          }
        }
      end

      def pillar_filter
        { terms: { 'payload.brainHealthPillar': selected_pillar } }
      end

      def filter_query
        {
          filter: {
            bool: {
              must: combined_filters
            }
          }
        }
      end

      def combined_filters
        filters = []
        filters << pillar_filter if params[:pillar].present?
        filters << games_filter if user_policy.unpaid?
        filters
      end

      def games?
        params[:content_type] == 'games'
      end

      def resources
        case params[:content_type]
        when 'articles'
          [Article]
        when 'recipes'
          recipes
        when 'games'
          [Game]
        when 'activities'
          activities
        else
          user_policy.paid? ? all_resources : [Article, Game]
        end
      end

      def recipes
        user_policy.paid? ? [Recipe] : []
      end

      def activities
        user_policy.paid? ? [Activity] : []
      end

      def all_resources
        [Activity, Article, Game, Recipe]
      end

      def user_policy
        @user_policy ||= UserPolicies.new(current_user)
      end
    end
  end
end
