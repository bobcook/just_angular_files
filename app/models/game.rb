class Game < ActiveRecord::Base
  include Publishable
  include WithPillars
  include WithKeywords
  include WithElasticsearch
  include WithReviews

  include SearchResultsMetadata

  extend FriendlyId
  friendly_id :title, use: :slugged

  has_many :pillar_categorizations, as: :categorizable
  has_many :pillars, through: :pillar_categorizations
  has_many :user_games, dependent: :destroy
  has_many :reviews, as: :reviewable, dependent: :destroy
  has_many :question_recommendations, as: :recommendable
  has_many :assessment_questions, through: :question_recommendations

  def outdated?(date)
    last_modified < date
  end

  def self.maybe_for_pillar(_)
    all
  end
end
