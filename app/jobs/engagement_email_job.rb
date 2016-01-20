class EngagementEmailJob < ActiveJob::Base
  queue_as :default

  def perform(user)
    EngagementEmails.new(user).send
  end
end
