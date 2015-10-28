require 'rails_helper'

describe UserGame do
  it { should belong_to(:user) }
  it { should belong_to(:game) }

  it 'validates uniqueness of user and game' do
    user = create(:user)
    game = create(:game)

    user_game_1 = create(:user_game, user: user, game: game)
    expect(user_game_1).to be_valid

    user_game_2 = build(:user_game, user: user, game: game)
    expect(user_game_2).to be_invalid
  end
end
