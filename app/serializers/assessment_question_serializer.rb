class AssessmentQuestionSerializer < ActiveModel::Serializer
  attributes :id, :text, :answer_options, :recommendation_id, :order, :type,
             :assessment_id, :answer_values
end
