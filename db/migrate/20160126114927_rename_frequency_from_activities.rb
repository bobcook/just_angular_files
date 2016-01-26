class RenameFrequencyFromActivities < ActiveRecord::Migration
  def change
    rename_column :activities, :recommended_effort_time, :recommended_effort
    remove_column :activities, :recommended_effort_frequency
  end
end
