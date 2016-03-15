class AssessmentQuestionSerializer < ActiveModel::Serializer
  attributes :id, :text, :answer_options, :external_recommendation_id, :order,
             :type, :assessment_id, :answer_values, :pillar_name

  def pillar_name
    (object.pillar.try(:display_name) || 'move').downcase
  end
end
