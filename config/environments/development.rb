Rails.application.configure do
  config.cache_classes = false
  config.eager_load = false
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false
  config.active_support.deprecation = :log
  config.active_record.migration_error = :page_load
  config.action_view.raise_on_missing_translations = true
  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :letter_opener
end
