class AssessmentResponse < ActiveRecord::Base
  belongs_to :user_assessment
  belongs_to :assessment_question

  def scored_response?
    assessment_question.answer_values.present?
  end
end
