class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :title
      t.string :recommended_effort_time
      t.string :recommended_effort_frequency
      t.json :payload
      t.belongs_to :activity_tracker, index: true
      t.integer :points

      t.timestamps
    end
  end
end
