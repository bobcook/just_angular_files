class CreateActivityReminderSettings < ActiveRecord::Migration
  def change
    create_table :activity_reminder_settings do |t|
      t.integer :days
      t.integer :contact_methods
      t.integer :times
      t.references :user_activity, index: true, foreign_key: true

      t.timestamps
    end
  end
end
