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
         :omniauthable, omniauth_providers: [:aarp]

  as_enum :membership_status, prospect: 0, paid: 1, lead: 2

  validate :not_over_max_activities
  validates :external_id, uniqueness: true

  def max_activity_limit?
    user_activities.count >= MAX_ACTIVITY_LIMIT
  end

  def engagement_level
    case
    when user_activities.present?                  then 3
    when user_assessment_groups.any?(&:completed?) then 2
    when user_assessment_groups.present?           then 1
    else                                                0
    end
  end

  def expired?
    lead?
  end

  private

  def not_over_max_activities
    message = ''
    return unless user_activities.count > MAX_ACTIVITY_LIMIT
    errors.add(:user_activities, message)
  end
end
