class RemoveStiFromActivityTrackerQuestions < ActiveRecord::Migration
  def change
    remove_column :activity_tracker_questions, :type
  end
end
