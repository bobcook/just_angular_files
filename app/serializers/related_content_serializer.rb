class RelatedContentSerializer < ActiveModel::Serializer
  has_many :activities, serializer: ActivitySerializer
  has_many :articles, serializer: ArticleSerializer
  has_many :recipes, serializer: RecipeSerializer
end
