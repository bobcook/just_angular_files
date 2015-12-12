# For the Service Provider side of SAML -- ideally we wouldn't need this,
# but the saml_idp gem doesn't give a good way to start the IdP-initiated flow
module SamlSP
  def self.config
    mbs_auth_url = ENV.fetch('MBS_AUTH')
    mbs_issuer = mbs_auth_url.split('.com')[0] + '.com/'

    OpenStruct.new(
      assertion_consumer_service_url: mbs_auth_url,
      issuer: mbs_issuer,
      idp_sso_target_url: '/api/v1/mbs/auth',
      idp_cert: ENV.fetch('SHARECARE_PUBLIC_CERT'),
      name_identifier_format:
        'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
    )
  end
end
