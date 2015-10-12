# For copy text to be used on frontend
module Api
  module V1
    class CopyController < Api::V1::BaseController
      def show
        I18n.t(:info) # Need to initialize I18n.backend
        all_i18n = I18n.backend.send(:translations)[I18n.default_locale]

        render json: all_i18n
      end
    end
  end
end
