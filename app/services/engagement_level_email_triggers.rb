module EngagementLevelEmailTriggers
  def self.should_send_email?(engagement_level, date_last_seen)
    dls = date_last_seen
    el = engagement_level

    level_zero(el, dls) ||
      level_one(el, dls) ||
      level_two(el, dls) ||
      level_three(el, dls)
  end

  private

  def self.level_zero(engagement_level, date_last_seen)
    ((6.days.ago..5.days.ago).cover?(date_last_seen) && engagement_level == 0)
  end

  def self.level_one(engagement_level, date_last_seen)
    ((3.days.ago..2.days.ago).cover?(date_last_seen) && engagement_level == 1)
  end

  def self.level_two(engagement_level, date_last_seen)
    ((6.days.ago..5.days.ago).cover?(date_last_seen) && engagement_level == 2)
  end

  def self.level_three(engagement_level, date_last_seen)
    ((6.days.ago..5.days.ago).cover?(date_last_seen) && engagement_level == 3)
  end
end
