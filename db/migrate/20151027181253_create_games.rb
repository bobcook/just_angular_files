class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :title
      t.datetime :published_at, null: false
      t.datetime :last_modified, null: false
      t.json :payload

      t.timestamps
    end
  end
end
