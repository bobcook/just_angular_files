class AddExpirationDateToUser < ActiveRecord::Migration
  def change
    add_column :users, :membership_expiration, :datetime
  end
end
