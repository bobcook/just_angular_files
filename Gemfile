source 'https://rubygems.org'

source 'https://nyvTgvizKAKWAVynPmpS@gem.fury.io/jdwolk/' do
  gem 'wippersnapper', '~> 0.1.0'
end

ruby `cat .ruby-version`.strip

gem 'active_model_serializers', '~> 0.8.0'
gem 'airbrake', '~> 4.3.0'
gem 'bitmask_attributes', '~> 1.0.0'
gem 'bundler', '>= 1.8.4'
gem 'devise', '~> 3.5.2'
gem 'factory_girl_rails', '~> 4.5.0'
gem 'faraday', '~> 0.9.1'
gem 'faraday_middleware', '~> 0.10.0'
gem 'fastly-rails', '~> 0.4.0'
gem 'i18n-tasks', '~> 0.8.7'
gem 'jwt', '~> 1.5.1'
gem 'momentjs-rails', '~> 2.10.3'
gem 'multi_xml', '~> 0.5.5'
gem 'newrelic_rpm', '>= 3.9.8'
gem 'omniauth', '~> 1.2.2'
gem 'pg', '~> 0.18.2'
gem 'rack-canonical-host', '~> 0.1.0'
gem 'rack-cors', '~> 0.4.0'
gem 'rails', '4.2.3'
gem 'rails-api', '~> 0.4.0'
gem 'redis-rails', '~> 4.0.0'
gem 'ruby-saml', '~> 1.0.0'
gem 'saml_idp', '~> 0.2.1'
gem 'sidekiq', '~> 3.5.0'
gem 'therubyracer', '~> 0.12.2'
gem 'unicorn', '~> 4.9.0'

group :development do
  gem 'better_errors', '~> 2.1.1'
  gem 'binding_of_caller', '~> 0.7.2'
  gem 'letter_opener', '~> 1.4.1'
  gem 'rails-erd', '~> 1.4.3'
  gem 'spring-commands-rspec', '~> 1.0.4'
  gem 'spring', '~> 1.3.6'
  gem 'stairs', '~> 0.9.0'
end

group :development, :test do
  gem 'bundler-audit', '~> 0.4.0', require: false
  gem 'dotenv-rails', '~> 2.0.2'
  gem 'pry-byebug', '~> 3.2.0'
  gem 'pry-rails', '~> 0.3.4'
  gem 'rspec-rails', '~> 3.1.0'
  gem 'rubocop', '~> 0.33.0'
end

group :test do
  gem 'database_cleaner', '~> 1.4.1'
  gem 'rspec-sidekiq', '~> 2.1.0'
  gem 'shoulda-matchers', '~> 2.8.0', require: false
  gem 'timecop', '~> 0.8.0'
end

group :staging, :production do
  gem 'passenger', '~> 5.0.15'
  gem 'rails_12factor', '~> 0.0.3'
end
