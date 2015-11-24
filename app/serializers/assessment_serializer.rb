class AssessmentSerializer < ActiveModel::Serializer
  attributes :id, :type, :assessment_questions, :order

  def assessment_questions
    object.assessment_questions.order(:order)
  end
end
