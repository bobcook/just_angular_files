class Recipe < ActiveRecord::Base
  include WithPillars
  include Publishable

  has_many :pillar_categorizations, as: :categorizable
  has_many :pillars, through: :pillar_categorizations
  has_many :user_recipes, dependent: :destroy
  has_many :users, through: :user_recipes
  has_many :reviews, as: :reviewable, dependent: :destroy
end
