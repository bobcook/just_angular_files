class AddPublishFieldsToRecipe < ActiveRecord::Migration
  def change
    change_table :recipes do |t|
      t.datetime :published_at, null: false
      t.datetime :last_modified, null: false
    end
  end
end
