class CreateAssessmentResponses < ActiveRecord::Migration
  def change
    create_table :assessment_responses do |t|
      t.references :assessment_question, index: true, foreign_key: true
      t.references :user_assessment, index: true, foreign_key: true
      t.string :response

      t.timestamps
    end
  end
end
