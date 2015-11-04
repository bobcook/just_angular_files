class CreateAssessments < ActiveRecord::Migration
  def change
    create_table :assessments do |t|
      t.string :name
      t.integer :order
      t.string :type

      t.timestamps
    end
  end
end
