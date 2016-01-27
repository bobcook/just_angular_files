module Api
  module V1
    module Mbs
      class SamlIdpController < SamlIdp::IdpController
        after_action :allow_iframe, only: :create
        before_action :authenticate_user!

        def create
          if current_user
            @saml_response = idp_make_saml_response(current_user)
            render template: 'saml_idp/idp/saml_post', layout: false
          else
            redirect_to Frontend::Paths.lookup(:login_failure)
          end
        end

        private

        def idp_make_saml_response(found_user)
          encode_response found_user
        end

        # NOTE: build_reponses lets us view the SAML XML respose when debugging.
        # Both #build_reponses and #get_audience_uri should be removed when SAML
        # testing is finished
        def build_response(principal, opts = {})
          response_id = get_saml_response_id
          reference_id = get_saml_reference_id
          audience_uri = get_audience_uri(opts)
          opt_issuer_uri = opts[:issuer_uri] || issuer_uri

          sample_response = SamlIdp::SamlResponse.new(
            reference_id,
            response_id,
            opt_issuer_uri,
            principal,
            audience_uri,
            saml_request_id,
            saml_acs_url,
            algorithm,
            authn_context_classref
          )
          sample_response.send(:response_builder).raw
        end

        def get_audience_uri(opts)
          opts[:audience_uri] || saml_request.issuer ||
            saml_acs_url[%r{^(.*?//.*?/)}, 1]
        end

        def allow_iframe
          response.headers.except! 'X-Frame-Options'
        end
      end
    end
  end
end
