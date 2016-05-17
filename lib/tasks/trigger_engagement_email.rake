namespace :trigger_engagement_email do
  task all: :environment do
    User.find_each do |user|
      ls = user.last_seen_at
      el = user.engagement_level
      if EngagementLevelEmailTriggers.should_send_email?(ls, el)
        EngagementEmails.new(user).send_later
      end
    end
  end
end
