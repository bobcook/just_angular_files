class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.datetime :publish_date
      t.datetime :last_modified
      t.json :payload, null: false
      t.string :type, null: false
      t.string :uuid
      t.string :url

      t.timestamps null: false
    end
  end
end
