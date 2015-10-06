class ActivityTrackerResponseSerializer < ActiveModel::Serializer
  attributes :id, :response
  has_one :activity_tracker_question,
          serializer: ActivityTrackerQuestionSerializer

  def response
    object.response.to_f
  end
end
