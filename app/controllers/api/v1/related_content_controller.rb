module Api
  module V1
    class RelatedContentController < Api::V1::BaseController
      def index
        if sanitizer.valid?
          respond_with related_content, serializer: RelatedContentSerializer
        else
          errors = sanitizer.errors.messages
          render json: { errors: errors }, status: :unprocessable_entity
        end
      end

      private

      def related_content
        @related_content ||=
          PillarQuerying.new(
            pillars: pillars,
            counts: {
              activities: params[:activities].to_i,
              articles: params[:articles].to_i,
              games: params[:games].to_i,
              recipes: params[:recipes].to_i
            }
          )
      end

      def sanitizer
        @sanitizer ||= ::RelatedContentSanitizer.new(params)
      end

      def pillars
        @pillars ||= params[:pillars] || Pillar.default_types
      end
    end
  end
end
