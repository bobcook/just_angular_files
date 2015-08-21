web: ./passenger-status-service-agent & bundle exec passenger start -p $PORT --max-pool-size 3 --min-instances 3
worker: bundle exec sidekiq -q default -q mailers
