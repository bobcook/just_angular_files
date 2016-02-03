class UserAssessmentGroupSerializer < ActiveModel::Serializer
  attributes :completed?, :id, :created_at, :started?
  has_many :user_assessments, serializer: UserAssessmentSerializer

  def user_assessments
    object.user_assessments.order(:order)
  end
end
