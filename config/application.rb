require File.expand_path('../boot', __FILE__)

require 'rails'

require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module StayingSharp
  class Application < Rails::Application
    config.i18n.enforce_available_locales = true

    config.generators do |generate|
      generate.assets false
      generate.helper false
      generate.javascript_engine false
      generate.request_specs false
      generate.routing_specs false
      generate.stylesheets false
      generate.test_framework :rspec
      generate.view_specs false
    end

    config.middleware.use Rack::MethodOverride
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
    config.middleware.use ActionDispatch::Flash

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource(
          '/api/*',
          headers: :any,
          expose: %w(
            access-token expiry token-type uid client
          ),
          methods: [:get, :post, :options, :delete, :put]
        )
      end
    end

    config.assets.enabled = false

    config.action_controller.action_on_unpermitted_parameters = :raise

    config.autoload_paths += %W(
      #{config.root}/lib
    )

    config.active_record.raise_in_transactional_callbacks = true

    config.active_job.queue_adapter = :sidekiq

    config.cache_store =
      :redis_store,
      ENV['REDISCLOUD_URL'] || 'redis://127.0.0.1:6379/0/myapp'

    Elasticsearch::Model.client = Elasticsearch::Client.new host: ENV['ELASTICSEARCH_HOST']

  end
end
