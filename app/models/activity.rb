class Activity < ActiveRecord::Base
  include WithPillars

  has_many :pillar_categorizations, as: :categorizable
  has_many :pillars, through: :pillar_categorizations
  has_many :user_activities

  belongs_to :activity_tracker, inverse_of: :activity

  def saved?(current_user)
    user_activities.where(user: current_user).any?
  end
end
