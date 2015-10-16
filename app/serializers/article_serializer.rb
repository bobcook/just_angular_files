class ArticleSerializer < ActiveModel::Serializer
  # TODO: attributes TBD when we get the final JSON
  attributes :id, :payload, :title, :type, :duration

  def duration
    '6 mins.' # TODO: real value normalization based on Article type
  end
end
