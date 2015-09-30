SamlSP.configure do |config|
  config.assertion_consumer_service_url =
    'https://stage.mybrainsolutions.com/SSO/AARP.aspx'

  config.issuer = 'https://stage.mybrainsolutions.com/'

  # IDP settings
  config.idp_sso_target_url = '/api/v1/mbs/auth'
  config.idp_cert = ENV.fetch('SHARECARE_PUBLIC_CERT')
  config.name_identifier_format =
    'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
end
