module Api
  module V1
    module Mbs
      class AssessmentsCallbackController < ApplicationController
        skip_before_action :verify_authenticity_token
        before_filter :authenticate_user!

        def create
          render json: frontend_redirect_data.as_json, status: :ok
        end

        private

        def frontend_redirect_data
          # TODO: whitelist assessment names
          { 'redirectUrl' => assessment_url }
        end

        def assessment_url
          @assessment_url ||=
            Frontend::Paths.lookup(:assessments, params[:assessmentCompleted])
        end
      end
    end
  end
end
