class ActivityReminderSetting < ActiveRecord::Base
  belongs_to :user_activity

  enum reminder_options: { 'Yes' => 1, 'No' => 0 }
  enum day_options: [:Mon, :Tue, :Wed, :Thu, :Fri, :Sat, :Sun]
  enum contact_options: [:email, :phone]
  enum time_options: [:morning, :afternoon, :evening]

  validates :reminders, presence: true
end
