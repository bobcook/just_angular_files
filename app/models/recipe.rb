class Recipe < ActiveRecord::Base
  include WithPillars

  has_many :pillar_categorizations, as: :categorizable
  has_many :pillars, through: :pillar_categorizations
  has_many :user_recipes, dependent: :destroy
  has_many :users, through: :user_recipes
end