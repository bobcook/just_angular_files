class CreateActivityTrackerResponse < ActiveRecord::Migration
  def change
    create_table :activity_tracker_responses do |t|
      t.string :response
      t.references :activity_tracker_question,
                   index: { name: 'activity_tracker_responses_on_question' },
                   foreign_key: true
      t.timestamps
    end
  end
end
