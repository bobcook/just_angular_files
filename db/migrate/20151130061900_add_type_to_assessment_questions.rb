class AddTypeToAssessmentQuestions < ActiveRecord::Migration
  def change
    add_column :assessment_questions, :type, :string
  end
end
