class Recipe < ActiveRecord::Base
  include WithPillars

  has_many :pillar_categorizations, as: :categorizable
  has_many :pillars, through: :pillar_categorizations
  has_many :user_recipes, dependent: :destroy
  has_many :users, through: :user_recipes

  before_save :set_defaults

  def self.newest_first
    order(last_modified: :desc)
  end

  private

  def set_defaults
    self.last_modified ||= current_time
    self.published_at ||= current_time
  end

  def current_time
    Time.current
  end
end
