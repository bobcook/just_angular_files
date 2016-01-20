class AddRawMembershipStatusToUsers < ActiveRecord::Migration
  def change
    add_column :users, :membership_status_cd, :integer
  end
end
