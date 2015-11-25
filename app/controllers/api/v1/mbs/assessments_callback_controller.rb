module Api
  module V1
    module Mbs
      class AssessmentsCallbackController < ApplicationController
        before_action :authenticate_user!

        def create
          # TODO: Figure out what to do with the data we get back from MBS
          render json: mbs_data, status: :ok
        end

        private

        def mbs_data
          {
            completed_assessment: params[:assessmentCompleted]
          }
        end
      end
    end
  end
end
