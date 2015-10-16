class RecipeSerializer < ActiveModel::Serializer
  # TODO: attributes TBD when we get final JSON
  attributes :id, :payload, :title, :duration

  has_many :pillars

  def duration
    object.prep_time # TODO: normalize value w/ Articles
  end
end
