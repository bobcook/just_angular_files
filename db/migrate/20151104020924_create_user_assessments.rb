class CreateUserAssessments < ActiveRecord::Migration
  def change
    create_table :user_assessments do |t|
      t.references :user, index: true, foreign_key: true
      t.references :assessment, index: true, foreign_key: true

      t.timestamps
    end
  end
end
