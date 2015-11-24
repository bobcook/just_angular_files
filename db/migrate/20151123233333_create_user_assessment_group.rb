class CreateUserAssessmentGroup < ActiveRecord::Migration
  def change
    create_table :user_assessment_groups do |t|
      t.references :user, index: true, foreign_key: true
      t.timestamps
    end

    add_reference :user_assessments, :user_assessment_group, index: true, foreign_key: true
    add_column :user_assessments, :completed, :boolean
    add_column :user_assessments, :order, :integer
    remove_reference :user_assessments, :user
  end
end
