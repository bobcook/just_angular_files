class CreateActivityTracker < ActiveRecord::Migration
  def change
    create_table :activity_trackers do |t|
      t.string :name

      t.timestamps
    end
  end
end
