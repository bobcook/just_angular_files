class RecommendedContentSerializer < ActiveModel::Serializer
  attributes :id, :recommendable_type

  has_one :recommendable, polymorphic: true
end
