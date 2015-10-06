class ArticleSerializer < ActiveModel::Serializer
  # TODO: attributes TBD when we get the final JSON
  attributes :id, :payload, :title, :type
end
