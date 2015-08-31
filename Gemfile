source 'https://rubygems.org'

ruby `cat .ruby-version`.strip

gem 'airbrake', '~> 4.3.0'
gem 'autoprefixer-rails', '~> 5.2.1.2'
gem 'bundler', '>= 1.8.4'
gem 'coffee-rails', '~> 4.1.0'
gem 'flutie', '~> 2.0.0'
gem 'i18n-tasks', '~> 0.8.7'
gem 'newrelic_rpm', '>= 3.9.8'
gem 'pg', '~> 0.18.2'
gem 'quiet_assets', '~> 1.1.0'
gem 'rack-canonical-host', '~> 0.1.0'
gem 'rails', '4.2.3'
gem 'sass-rails', '~> 5.0'
gem 'sidekiq', '~> 3.4.2'
gem 'simple_form', '~> 3.1.0'
gem 'title', '~> 0.0.5'
gem 'uglifier', '~> 2.7.1'
gem 'unicorn', '~> 4.9.0'
gem 'high_voltage', '~> 2.4.0'
gem 'fastly-rails', '~> 0.4.0'
gem 'faraday', '~> 0.9.1'
gem 'multi_xml', '~> 0.5.5'
gem 'redis-rails', '~> 4.0.0'
gem 'omniauth', '~> 1.2.2'
gem 'devise', '~> 3.5.2'

gem 'celluloid', '0.16.0' # for sidekiq; 0.16.1 was yanked from Rubygems
#                           and sidekiq is locked below 0.17.0

source 'https://rails-assets.org' do
  gem 'rails-assets-jquery', '~> 2.1.4'
  gem 'rails-assets-jquery-ujs', '~> 1.0.4'
end

group :development do
  gem 'better_errors', '~> 2.1.1'
  gem 'binding_of_caller', '~> 0.7.2'
  gem 'spring', '~> 1.3.6'
  gem 'spring-commands-rspec', '~> 1.0.4'
  gem 'stairs', '~> 0.9.0'
  gem 'letter_opener', '~> 1.4.1'
end

group :development, :test do
  gem 'bundler-audit', '~> 0.4.0', require: false
  gem 'dotenv-rails', '~> 2.0.2'
  gem 'factory_girl_rails', '~> 4.5.0'
  gem 'pry-byebug', '~> 3.2.0'
  gem 'pry-rails', '~> 0.3.4'
  gem 'rspec-rails', '~> 3.1.0'
  gem 'rspec-sidekiq', '~> 2.1.0'
  gem 'rubocop', '~> 0.33.0'
end

group :test do
  gem 'capybara-webkit', '>= 1.2.0'
  gem 'database_cleaner', '~> 1.4.1'
  gem 'launchy', '~> 2.4.3'
  gem 'shoulda-matchers', '~> 2.8.0', require: false
  gem 'timecop', '~> 0.8.0'
end

group :staging, :production do
  gem 'rails_12factor', '~> 0.0.3'
  gem 'rack-timeout', '~> 0.2.4'
  gem 'passenger', '~> 5.0.15'
end
