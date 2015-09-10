FactoryGirl.define do
  factory :activity_reminder_settings, class: ActivityReminderSetting do
    days [
      ActivityReminderSetting.values_for_days.first,
      ActivityReminderSetting.values_for_days.second
    ]
    contact_methods [
      ActivityReminderSetting.values_for_contact_methods.first
    ]
    times [
      ActivityReminderSetting.values_for_times.first,
      ActivityReminderSetting.values_for_times.second
    ]
    user_activity

    factory :default_settings do
      days []
      contact_methods []
      times []
      user_activity
    end
  end
end
