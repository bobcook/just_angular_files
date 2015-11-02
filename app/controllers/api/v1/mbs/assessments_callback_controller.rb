module Api
  module V1
    module Mbs
      class AssessmentsCallbackController < ApplicationController
        skip_before_action :verify_authenticity_token
        before_filter :authenticate_user!

        def create
          # TODO: redirect based on which assessment the user is at
          redirect_to Frontend::Paths.lookup(
            :assessments, params[:assessmentCompleted]
          )
        end
      end
    end
  end
end
