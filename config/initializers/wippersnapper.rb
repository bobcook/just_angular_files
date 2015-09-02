module Wippersnapper
  configure do |config|
    config.notifiers = [Notifiers::Log, Notifiers::Airbrake]
    config.triggers  =
      [Triggers::EnvIs::Production, Triggers::DateIs.after('September 18')]
  end
end
