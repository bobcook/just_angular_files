class LifestyleResultSerializer < ActiveModel::Serializer
  def self.all_attributes
    Lifestyle::AssessmentResults.lifestyle_category_names.map(&:to_sym) +
      [:type, :created_at, :id]
  end

  attributes(*all_attributes)

  def type
    'Lifestyle'
  end
end
