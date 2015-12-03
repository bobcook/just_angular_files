module Api
  module V1
    class AssessmentsController < Api::V1::BaseController
      before_filter :authenticate_user!

      def index
        respond_with assessments, each_serializer: AssessmentSerializer
      end

      def show
        respond_with Assessment.find(params[:id]),
                     serializer: AssessmentSerializer
      end

      private

      def assessments
        @assessments ||= Assessment.order(order: :asc)
      end
    end
  end
end
