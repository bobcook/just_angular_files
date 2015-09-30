module SamlIdp
  AssertionBuilder.class_eval do
    # This XML-generation code was copied from
    # https://github.com/sportngin/saml_idp/blob/master/lib/
    # saml_idp/assertion_builder.rb with slight changes to XML namespacing
    # so it can be consumed by MBS
    def fresh # rubocop:disable AbcSize
      builder = Builder::XmlMarkup.new
      builder.saml(
        :Assertion,
        ID: reference_string,
        IssueInstant: now_iso,
        Version: '2.0'
      ) do |assertion|
        assertion.saml :Issuer, issuer_uri
        sign assertion

        assertion.saml :Subject do |subject|
          subject.saml :NameID, name_id, Format: name_id_format[:name]
          subject.saml(
            :SubjectConfirmation,
            Method: Saml::XML::Namespaces::Methods::BEARER
          ) do |confirmation|
            confirmation.saml(
              :SubjectConfirmationData,
              '',
              InResponseTo: saml_request_id,
              NotOnOrAfter: not_on_or_after_subject,
              Recipient: saml_acs_url
            )
          end
        end

        assertion.saml(
          :Conditions,
          NotBefore: not_before,
          NotOnOrAfter: not_on_or_after_condition
        ) do |conditions|
          conditions.saml :AudienceRestriction do |restriction|
            restriction.saml :Audience, audience_uri
          end
        end

        assertion.saml :AttributeStatement do |attr_statement|
          config.attributes.each do |friendly_name, attrs|
            attrs = (attrs || {}).with_indifferent_access
            attr_statement.saml(
              :Attribute,
              Name: attrs[:name] || friendly_name
            ) do |attr|
              values = get_values_for friendly_name, attrs[:getter]
              values.each do |val|
                attr.saml(
                  :AttributeValue,
                  val.to_s,
                  'xmlns:xsi' => Saml::XML::Namespaces::Attributes::XSI,
                  'xsi:type' => Saml::XML::Namespaces::Attributes::TYPE
                )
              end
            end
          end
        end

        assertion.saml(
          :AuthnStatement,
          AuthnInstant: now_iso,
          SessionIndex: reference_string
        ) do |statement|
          statement.saml :AuthnContext do |context|
            context.saml :AuthnContextClassRef, authn_context_classref
          end
        end
      end
    end
    alias_method :raw, :fresh
    private :fresh
  end
end
