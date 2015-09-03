class User < ActiveRecord::Base
  MAX_ACTIVITY_LIMIT = 6

  include OmniauthCreation

  has_many :user_activities
  has_many :activities, through: :user_activities

  devise :database_authenticatable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:aarp]

  validate :not_over_max_activities

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
