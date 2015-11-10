module Api
  module V1
    class ExploreContentController < Api::V1::BaseController
      def show
        options = { serializer: ExploreContentSerializer }
        status = { status: :partial_content }
        options.merge!(status) unless explore_content.all_last_page?
        respond_with explore_content, options
      end

      private

      def explore_content
        ExploreContent.new(params)
      end
    end
  end
end
