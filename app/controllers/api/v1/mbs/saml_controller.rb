module Api
  module V1
    module Mbs
      class SamlController < ApplicationController
        before_action :authenticate_user!

        def init
          auth_request = OneLogin::RubySaml::Authrequest.new
          redirect_to(auth_request.create(SamlSP.settings))
        end
      end
    end
  end
end
