class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :payload, :title, :type
end
