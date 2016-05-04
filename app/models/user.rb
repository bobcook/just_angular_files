class User < ActiveRecord::Base
  MAX_ACTIVITY_LIMIT = 6

  include OmniauthCreation

  has_many :activities, through: :user_activities
  has_many :recipes, through: :user_recipes
  has_many :articles, through: :user_articles
  has_many :games, through: :user_games
  has_many :reviews

  has_many :user_activities, dependent: :destroy
  has_many :user_recipes, dependent: :destroy
  has_many :user_articles, dependent: :destroy
  has_many :user_games, dependent: :destroy
  has_many :user_assessment_groups, dependent: :destroy
  has_many :user_assessments, through: :user_assessment_groups

  devise :database_authenticatable, :rememberable, :trackable, :validatable,
         :omniauthable,
         omniauth_providers: [:aarp],
         authentication_keys: [:external_id]

  as_enum :membership_status, prospect: 0, paid: 1, lead: 2

  validate :not_over_max_activities
  validates :external_id, uniqueness: true

  def max_activity_limit?
    user_activities.count >= MAX_ACTIVITY_LIMIT
  end

  def engagement_level
    case
    when complete_level_three  then 3
    when complete_level_two    then 2
    when complete_level_one    then 1
    else                            0
    end
  end

  def expired?
    lead?
  end

  def last_completed_user_assessment_group
    user_assessment_groups.reverse.find(&:completed?)
  end

  def email_required?
    false
  end

  private

  def complete_level_three
    user_assessment_groups.any?(&:completed?) && user_activities.present?
  end

  def complete_level_two
    user_assessment_groups.any?(&:completed?)
  end

  def complete_level_one
    user_assessment_groups.any?
  end

  def not_over_max_activities
    message = ''
    return unless user_activities.count > MAX_ACTIVITY_LIMIT
    errors.add(:user_activities, message)
  end
end
