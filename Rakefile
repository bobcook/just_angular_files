# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks
task(:default).clear

if defined?(RSpec) && defined?(RuboCop)
  require 'rubocop/rake_task'
  require 'rspec/core/rake_task'

  RuboCop::RakeTask.new

  task default: [:rubocop, :spec]
end
