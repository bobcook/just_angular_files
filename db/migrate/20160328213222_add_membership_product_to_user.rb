class AddMembershipProductToUser < ActiveRecord::Migration
  def change
    add_column :users, :membership_product, :string
  end
end
