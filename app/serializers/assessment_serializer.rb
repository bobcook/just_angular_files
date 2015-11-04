class AssessmentSerializer < ActiveModel::Serializer
  attributes :id, :type
  has_many :assessment_questions
end
