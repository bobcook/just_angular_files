class UserAssessmentGroupSerializer < ActiveModel::Serializer
  attributes :completed?, :id, :created_at
  has_many :user_assessments, serializer: UserAssessmentSerializer

  def user_assessments
    object.user_assessments.order(:order)
  end
end
