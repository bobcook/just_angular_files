class UserGame < ActiveRecord::Base
  belongs_to :user
  belongs_to :game

  validates :game, uniqueness: { scope: :user }
end
