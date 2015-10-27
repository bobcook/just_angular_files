class Game < ActiveRecord::Base
  include Publishable
  include WithPillars

  has_many :pillar_categorizations, as: :categorizable
  has_many :pillars, through: :pillar_categorizations
end
