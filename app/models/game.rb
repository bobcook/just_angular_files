class Game < ActiveRecord::Base
  include Publishable
  include WithPillars

  has_many :pillar_categorizations, as: :categorizable
  has_many :pillars, through: :pillar_categorizations
  has_many :user_games, dependent: :destroy
  has_many :game_reviews, dependent: :destroy
  has_many :reviews, as: :reviewable, dependent: :destroy
end
