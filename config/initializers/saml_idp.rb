SamlIdp.configure do |config|
  require_relative '../../lib/saml_idp/extensions'

  base = ENV.fetch('HOST')

  config.x509_certificate = ENV.fetch('SHARECARE_PUBLIC_CERT')
  config.secret_key = ENV.fetch('SHARECARE_PRIVATE_KEY')

  config.base_saml_location = "#{base}/api/v1/mbs"
  config.single_service_post_location = "#{base}/api/v1/mbs/auth"
  config.entity_id = 'urn:federation:partner:stage'

  # Principal is passed in when you `encode_response`
  config.name_id.formats =
    {
      email_address: -> (principal) { principal.email },
      transient: -> (principal) { principal.id },
      persistent: -> (principal) { principal.id }
    }

  config.attributes = {
    firstname: {
      getter: -> (principal) { principal.first_name }
    },
    lastname: {
      getter: -> (principal) { principal.last_name }
    },
    email: {
      getter: -> (principal) { principal.email }
    },
    uniqueuserid: {
      getter: -> (principal) { principal.id }
    },
    # TODO: get these from user questionnaire
    gender: {
      getter: -> (_principal) { 'MALE' }
    },
    yrofedu: {
      getter: -> (_prinicpal) { 16 }
    },
    hand: {
      getter: -> (_principal) { 'RIGHT' }
    }
  }

  service_providers = {
    'stage.mybrainsolutions.com/SSO/AARP.aspx' => {
      fingerprint:
        '68:A3:B2:DB:75:0F:68:91:D0:7B:B2:2A:E3:36:AC:39:FA:77:51:7B',
      metadata_url: ''
    }
  }

  # Find ServiceProvider metadata_url and fingerprint based on our settings
  config.service_provider.finder = lambda do |issuer_or_entity_id|
    service_providers[issuer_or_entity_id]
  end
end
