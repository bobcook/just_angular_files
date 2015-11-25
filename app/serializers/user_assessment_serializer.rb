class UserAssessmentSerializer < ActiveModel::Serializer
  attributes :id, :completed, :assessment_id, :user_assessment_group_id, :type
  has_one :assessment
end
