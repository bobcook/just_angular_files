class ActivityReminderSetting < ActiveRecord::Base
  include BitmaskPredicates
  include CollectionUtils

  belongs_to :user_activity

  bitmask :days, as:
    [:monday, :tuesday, :wednesday, :thursday, :friday, :saturday, :sunday]
  bitmask :contact_methods, as: [:email, :text]
  bitmask :times, as: [:morning, :afternoon, :evening]

  def self.defaults
    new(default_settings)
  end

  def self.default_settings
    { days: [], contact_methods: [], times: [] }
  end

  def self.settings_keys
    default_settings.keys
  end

  def reset(user_activity_id)
    assign(
      self.class.default_settings.merge(user_activity_id: user_activity_id)
    )
  end

  def assign(attrs)
    tap { |model| model.assign_attributes(attrs) }
  end

  def empty?
    settings_attributes == self.class.default_settings
  end

  private

  def settings_attributes
    keys = self.class.settings_keys
    values = self.class.settings_keys.map { |k| send(k) }
    zipmap(keys, values)
  end
end
