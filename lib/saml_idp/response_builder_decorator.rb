module SamlIdp
  ResponseBuilder.class_eval do
    def build
      builder = Builder::XmlMarkup.new
      builder.tag!(
        'samlp:Response',
        ID: response_id_string,
        Version: '2.0',
        IssueInstant: now_iso,
        Destination: saml_acs_url,
        Consent: Saml::XML::Namespaces::Consents::UNSPECIFIED,
        InResponseTo: saml_request_id,
        'xmlns:saml' => Saml::XML::Namespaces::ASSERTION,
        'xmlns:samlp' => Saml::XML::Namespaces::PROTOCOL
      ) do |response|
        response.saml :Issuer, issuer_uri
        response.tag! 'samlp:Status' do |status|
          status.tag!(
            'samlp:StatusCode',
            Value: Saml::XML::Namespaces::Statuses::SUCCESS
          )
        end
        response << assertion_and_signature
      end
    end
  end
end
