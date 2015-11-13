class ChangeUrlToCmsUrl < ActiveRecord::Migration
  def change
    rename_column :activities, :url, :cms_url
    rename_column :games, :url, :cms_url
    rename_column :recipes, :url, :cms_url
    rename_column :articles, :url, :cms_url
  end
end
