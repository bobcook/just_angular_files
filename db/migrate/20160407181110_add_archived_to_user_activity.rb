class AddArchivedToUserActivity < ActiveRecord::Migration
  def change
    add_column :user_activities, :archived, :boolean, default: false
  end
end
