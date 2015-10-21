module Api
  module V1
    class PillarsController < Api::V1::BaseController
      def index
        respond_with pillars
      end

      private

      def pillars
        @pillars ||= Pillar.all
      end
    end
  end
end
