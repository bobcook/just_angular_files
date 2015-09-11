class AddUserActivityPeriodToActivityTrackerResponses < ActiveRecord::Migration
  def change
    add_reference :activity_tracker_responses, :user_activity_period, index: true, foreign_key: true
  end
end
