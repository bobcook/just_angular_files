# RecommendedContent fetches one recommended_content for the 12 highest
# scores from assessment_responses. Grab 6 recommended_content.
module Api
  module V1
    module Me
      class RecommendedContentController < Api::V1::Me::BaseController
        RECOMMENDATION_LIMIT = 6

        def index
          render json: unique_recommended_content,
                 each_serializer: RecommendedContentSerializer
        end

        private

        def user_assessments
          current_user.user_assessment_groups.last.user_assessments
        end

        def assesssment_responses
          user_assessments.flat_map(&:assessment_responses)
        end

        def scored_responses
          assesssment_responses.select(&:scored_response?)
            .sort_by { |h| h[:response].to_i }
            .reverse
            .take(RECOMMENDATION_LIMIT * 2)
        end

        def recommended_content
          scored_responses.map do |response|
            response
              .assessment_question
              .question_recommendations
              .last
          end
        end

        # TODO: add a more robust method to get 6 unique recommendations
        def unique_recommended_content
          recommended_content
            .uniq { |rec| [rec.recommendable_id, rec.recommendable_type] }
            .take(RECOMMENDATION_LIMIT)
        end
      end
    end
  end
end
