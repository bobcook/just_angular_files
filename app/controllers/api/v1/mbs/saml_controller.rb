module Api
  module V1
    module Mbs
      class SamlController < ApplicationController
        before_action :authenticate_user!

        def create
          auth_request = OneLogin::RubySaml::Authrequest.new
          saml_request = Rack::Utils.unescape(
            auth_request.create(saml_settings).split('SAMLRequest')[1]
          )

          render json: { samlRequest: saml_request }
        end

        private

        def saml_settings
          OneLogin::RubySaml::Settings.new(SamlSP.config.to_h)
        end
      end
    end
  end
end
