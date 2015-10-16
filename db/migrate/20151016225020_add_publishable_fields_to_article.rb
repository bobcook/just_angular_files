class AddPublishableFieldsToArticle < ActiveRecord::Migration
  def change
    change_table :articles do |t|
      t.rename :publish_date, :published_at
    end
  end
end
