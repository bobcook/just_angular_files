class RecipeSerializer < ActiveModel::Serializer
  # TODO: attributes TBD when we get final JSON
  attributes :id, :payload, :title, :prep_time

  has_many :pillars
end
