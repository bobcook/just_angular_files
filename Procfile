web: ./passenger-status-service-agent & bundle exec passenger start -p $PORT $PASSENGER_CONFIGS
worker: bundle exec sidekiq -q default -q mailers
