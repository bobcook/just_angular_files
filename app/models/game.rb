class Game < ActiveRecord::Base
  include Publishable
  include WithPillars
  include WithKeywords
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  has_many :pillar_categorizations, as: :categorizable
  has_many :pillars, through: :pillar_categorizations
  has_many :user_games, dependent: :destroy
  has_many :game_reviews, dependent: :destroy
  has_many :reviews, as: :reviewable, dependent: :destroy
  has_many :question_recommendations, as: :recommendable
  has_many :assessment_questions, through: :question_recommendations

  def outdated?(date)
    last_modified < date
  end
end
