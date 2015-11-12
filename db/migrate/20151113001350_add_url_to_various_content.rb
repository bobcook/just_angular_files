class AddUrlToVariousContent < ActiveRecord::Migration
  def change
    change_table :activities do |t|
      t.string :url
    end
    change_table :games do |t|
      t.string :url
    end
    change_table :recipes do |t|
      t.string :url
    end
  end
end
