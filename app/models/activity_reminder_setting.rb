class ActivityReminderSetting < ActiveRecord::Base
  include BitmaskPredicates

  belongs_to :user_activity

  bitmask :days, as:
    [:monday, :tuesday, :wednesday, :thursday, :friday, :saturday, :sunday]
  bitmask :contact_methods, as: [:email, :text]
  bitmask :times, as: [:morning, :afternoon, :evening]

  def reset(user_activity_id)
    assign(self.class.default_settings
      .merge(user_activity_id: user_activity_id))
  end

  def assign(attrs)
    tap { |model| model.assign_attributes(attrs) }
  end

  def self.defaults
    new(default_settings)
  end

  def self.default_settings
    { days: [], contact_methods: [], times: [] }
  end
end
