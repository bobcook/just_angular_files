class CreateUserActivityPeriod < ActiveRecord::Migration
  def change
    create_table :user_activity_periods do |t|
      t.references :user_activity, index: true, foreign_key: true
      t.datetime :completed_date

      t.timestamps
    end
  end
end
