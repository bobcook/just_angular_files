class UserAssessmentGroupSerializer < ActiveModel::Serializer
  attributes :completed?, :user_assessments

  def user_assessments
    object.user_assessments.order(:order)
  end
end
