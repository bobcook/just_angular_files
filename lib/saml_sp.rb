# For the Service Provider side of SAML -- ideally we wouldn't need this,
# but the saml_idp gem doesn't give a good way to start the IdP-initiated flow
#
# This provides static config for OneLogin::RubySaml::Settings,
# since the gem doesn't provide a way to yield config settings in an
# initializer.
module SamlSP
  Config = Struct.new(
    :assertion_consumer_service_url,
    :issuer,
    :idp_sso_target_url,
    :idp_cert,
    :name_identifier_format
  )

  class << self
    attr_writer :config
  end

  def self.config
    @config ||= Config.new
  end

  def self.configure
    yield config
  end

  def self.settings
    OneLogin::RubySaml::Settings.new(config.to_h)
  end
end
