class ArticleSerializer < ActiveModel::Serializer
  # TODO: finish the rest of the attributes when doing the show article page
  attributes :id, :payload, :title, :type, :duration, :description

  def duration
    '6 mins.' # TODO: real value normalization based on Article type
  end

  def description
    object.payload['description']
  end
end
