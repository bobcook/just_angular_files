class AddPillarsToAsssessmentQuestions < ActiveRecord::Migration
  def change
    add_reference :assessment_questions, :pillar, index: true, foreign_key: true
  end
end
