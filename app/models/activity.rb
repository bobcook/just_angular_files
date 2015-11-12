class Activity < ActiveRecord::Base
  include Publishable
  include WithPillars

  has_many :pillar_categorizations, as: :categorizable
  has_many :pillars, through: :pillar_categorizations
  has_many :user_activities
  has_many :reviews, as: :reviewable, dependent: :destroy

  belongs_to :activity_tracker, inverse_of: :activities

  def saved?(current_user)
    user_activities.where(user: current_user).any?
  end

  def binary?
    activity_tracker.binary?
  end

  def outdated?(date)
    last_modified < date
  end
end
