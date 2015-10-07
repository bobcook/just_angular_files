class ArticleReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :recommend
  has_one :user
end
