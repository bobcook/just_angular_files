class AssessmentSerializer < ActiveModel::Serializer
  attributes :id, :type, :order
  has_many :assessment_questions, serializer: AssessmentQuestionSerializer

  def assessment_questions
    object.assessment_questions.order(:order)
  end
end
