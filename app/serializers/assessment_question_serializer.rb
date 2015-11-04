class AssessmentQuestionSerializer < ActiveModel::Serializer
  attributes :id, :text, :answer_options, :recommendation_id, :order
end
