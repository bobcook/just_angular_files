class GameSerializer < ActiveModel::Serializer
  # TODO: attributes TBD when we get final JSON
  attributes :id, :payload, :title

  has_many :pillars
end
