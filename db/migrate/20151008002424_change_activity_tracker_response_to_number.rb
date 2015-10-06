class ChangeActivityTrackerResponseToNumber < ActiveRecord::Migration
  def change
    change_column :activity_tracker_responses, :response, :decimal,
                  using: 'CAST(response AS decimal)'
  end
end
