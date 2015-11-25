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

  devise :database_authenticatable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:aarp]

  validate :not_over_max_activities
  validates :external_id, uniqueness: true

  def max_activity_limit?
    user_activities.count >= MAX_ACTIVITY_LIMIT
  end

  private

  def not_over_max_activities
    message = ''
    return unless user_activities.count > MAX_ACTIVITY_LIMIT
    errors.add(:user_activities, message)
  end
end
