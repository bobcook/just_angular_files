FastlyRails.configure do |config|
  config.api_key = ENV.fetch('FASTLY_API_KEY')
  days = 30
  seconds_per_day = 86_400
  config.max_age = days * seconds_per_day
  config.service_id = ENV.fetch('FASTLY_SERVICE_ID')
  config.purging_enabled = Rails.env.production?
end
