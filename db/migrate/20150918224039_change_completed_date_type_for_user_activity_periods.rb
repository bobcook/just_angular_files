class ChangeCompletedDateTypeForUserActivityPeriods < ActiveRecord::Migration
  def change
    remove_column :user_activity_periods, :completed_date
    add_column :user_activity_periods, :completed_date, :date
  end
end
