class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :body_image, :call_to_action_url, :card_image,
             :description, :difficulty_level, :game_type

  has_many :pillars

  def body_image
    object.payload['bodyImage']
  end

  def call_to_action_url
    object.payload['callToActionUrl']
  end

  def card_image
    object.payload['cardImage']
  end

  def description
    object.payload['description']
  end

  def difficulty_level
    object.payload['difficultyLevel']
  end

  def game_type
    object.payload['gameType']
  end
end
