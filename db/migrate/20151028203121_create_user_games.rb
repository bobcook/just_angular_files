class CreateUserGames < ActiveRecord::Migration
  def change
    create_table :user_games do |t|
      t.references :game, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps
      t.index [:user_id, :game_id], unique: true
    end
  end
end
