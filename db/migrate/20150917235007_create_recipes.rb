class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :read_time
      t.json :payload
      t.timestamps
    end
  end
end
