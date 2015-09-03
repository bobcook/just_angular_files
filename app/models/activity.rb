class Activity < ActiveRecord::Base
  has_many :pillar_categorizations, as: :categorizable
  has_many :pillars, through: :pillar_categorizations
  has_many :user_activities

  belongs_to :activity_tracker, inverse_of: :activity

  def saved?(current_user)
    user_activities.where(user: current_user).any?
  end

  # TODO: pull into concern once this is needed on Recipe, Article, etc
  def self.for_pillar(pillar)
    pillar = pillar.is_a?(Pillar) ? pillar : Pillar.find_by!(slug: pillar)
    pillar.activities.merge(all)
  end

  def pillar_names
    pillars.map(&:name).join(', ')
  end
end
