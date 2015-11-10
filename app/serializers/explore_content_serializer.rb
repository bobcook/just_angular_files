class ExploreContentSerializer < ActiveModel::Serializer
  has_many :activities, serializer: ActivitySerializer
  has_many :articles, serializer: ArticleSerializer
  has_many :games, serializer: GameSerializer
  has_many :recipes, serializer: RecipeSerializer
end
