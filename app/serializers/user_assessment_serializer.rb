class UserAssessmentSerializer < ActiveModel::Serializer
  attributes :id, :completed, :assessment_id, :user_assessment_group_id
end
