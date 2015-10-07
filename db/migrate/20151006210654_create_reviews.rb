class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.references :user, index: true, foreign_key: true
      t.references :reviewable, polymorphic: true, index: true
      t.string :comment
      t.boolean :recommend, null: false

      t.timestamps
      t.index [:user_id, :reviewable_id, :reviewable_type], unique: true
    end
  end
end
