class AddPublishableFieldsToActivity < ActiveRecord::Migration
  def up
    change_table :activities do |t|
      t.datetime :published_at
      t.datetime :last_modified
    end

    Article.find_each do |article|
      article.update(published_at: Time.current) unless article.published_at
      article.update(last_modified: Time.current) unless article.last_modified
    end

    Activity.find_each do |activity|
      activity.update(published_at: Time.current)
      activity.update(last_modified: Time.current)
    end

    change_column_null :articles, :published_at, false
    change_column_null :articles, :last_modified, false
    change_column_null :activities, :published_at, false
    change_column_null :activities, :last_modified, false
  end

  def down
    change_column_null :articles, :published_at, true
    change_column_null :articles, :last_modified, true

    change_table :activities do |t|
      t.remove :published_at, :last_modified
    end
  end
end
