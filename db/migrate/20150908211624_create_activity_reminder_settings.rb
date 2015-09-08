class CreateActivityReminderSettings < ActiveRecord::Migration
  def change
    create_table :activity_reminder_settings do |t|
      t.string :days, array: true, default: []
      t.string :contact_methods, array: true, default: []
      t.string :times, array: true, default: []
      t.references :user_activity, index: true, foreign_key: true

      t.timestamps
    end
  end
end
