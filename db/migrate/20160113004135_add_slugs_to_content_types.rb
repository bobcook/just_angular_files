class AddSlugsToContentTypes < ActiveRecord::Migration
  def up
    add_column :activities, :slug, :string, unique: true
    add_column :articles, :slug, :string, unique: true
    add_column :games, :slug, :string, unique: true
    add_column :recipes, :slug, :string, unique: true

    [Article, Activity, Game, Recipe].each do |resource|
      resource.find_each do |content|
        content.update(slug: content.title.parameterize)
      end
    end
  end

  def down
    remove_column :activities, :slug
    remove_column :articles, :slug
    remove_column :games, :slug
    remove_column :recipes, :slug
  end
end
