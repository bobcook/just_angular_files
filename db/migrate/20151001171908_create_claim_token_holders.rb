class CreateClaimTokenHolders < ActiveRecord::Migration
  def change
    create_table :claim_token_holders do |t|
      t.string :claim_token, null: false
      t.text :auth_token, null: false
      t.timestamps null: false
    end
  end
end
