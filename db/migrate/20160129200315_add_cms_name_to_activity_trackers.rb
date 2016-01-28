class AddCmsNameToActivityTrackers < ActiveRecord::Migration
  def change
    add_column :activity_trackers, :cms_name, :string
  end
end
