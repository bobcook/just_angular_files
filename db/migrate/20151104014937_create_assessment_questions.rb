class CreateAssessmentQuestions < ActiveRecord::Migration
  def change
    create_table :assessment_questions do |t|
      t.string :text
      t.string :answer_options, array: true, default: []
      t.string :answer_values, array: true, default: []
      t.integer :order, null: false
      t.references :assessment, index: true, foreign_key: true
      # TODO: might need to change recommendation_id to something else after
      # we start on the assessment recommendations
      t.integer :recommendation_id

      t.timestamps
    end
  end
end
