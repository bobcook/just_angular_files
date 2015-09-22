class UserRecipes < ActiveRecord::Migration
  def change
    create_table :user_recipes do |t|
      t.references :user, index: true, foreign_key: true
      t.references :recipe, index: true, foreign_key: true

      t.timestamps
    end
  end
end
