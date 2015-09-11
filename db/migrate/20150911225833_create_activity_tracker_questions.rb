class CreateActivityTrackerQuestions < ActiveRecord::Migration
  def change
    create_table :activity_tracker_questions do |t|
      t.references :activity_tracker, index: true, foreign_key: true
      t.string :text
      t.string :type, null: false

      t.timestamps
    end
  end
end
