class Recipe < ActiveRecord::Base
  include Publishable
  include WithPillars
  include WithKeywords
  include WithElasticsearch

  extend FriendlyId
  friendly_id :title, use: :slugged

  has_many :pillar_categorizations, as: :categorizable
  has_many :pillars, through: :pillar_categorizations
  has_many :user_recipes, dependent: :destroy
  has_many :users, through: :user_recipes
  has_many :reviews, as: :reviewable, dependent: :destroy
  has_many :question_recommendations, as: :recommendable
  has_many :assessment_questions, through: :question_recommendations

  def outdated?(date)
    last_modified < date
  end
end
