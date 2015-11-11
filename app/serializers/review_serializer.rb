class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :recommend
  has_one :user
end
