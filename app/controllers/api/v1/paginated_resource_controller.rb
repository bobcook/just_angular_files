module Api
  module V1
    # Expects inheriting controllers to define:
    # * #resource (must define #newest_first)
    # * #serializer
    class PaginatedResourceController < Api::V1::BaseController
      def show
        options = { serializer: serializer }

        instance ? respond_with(instance, options) : not_found
      end

      def index
        options = { each_serializer: serializer }
        options.merge!(status: :partial_content) unless collection.last_page?

        respond_with collection, options
      end

      private

      def serializer
        fail 'Must be overriden in children of PaginatedResourceController'
      end

      def resource
        fail 'Must be overriden in children of PaginatedResourceController'
      end

      def instance
        @instance ||= resource.find_by(id: params[:id])
      end

      def collection
        @collection ||= resource.newest_first.page(params[:page]).per(per_page)
      end

      def per_page
        params[:per_page] || I18n.t('config.pagination.per_page')
      end

      def not_found
        render json: { error: 'Content not found' }, status: :not_found
      end
    end
  end
end
