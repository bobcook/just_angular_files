class GameSerializer < ActiveModel::Serializer
  delegate :card_image, :description, :id, :recommend_percentage, to: :common

  attributes :id, :title, :call_to_action_url, :card_image, :card_title,
             :description, :game_type, :recommend_percentage, :slug,
             :game_provider

  has_many :pillars

  def call_to_action_url
    object.payload['callToActionURL']
  end

  def game_type
    object.payload['gameType']
  end

  def card_title
    object.title # TODO: they should introduce a cardTitle
  end

  def game_provider
    object.payload['difficultyLevel']
  end

  private

  def common
    @common ||= CommonContent.new(object)
  end
end
