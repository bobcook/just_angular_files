class RecipeSerializer < ActiveModel::Serializer
  delegate :card_image, :card_title, :description, :duration, :id,
           :mast_head_image, :mast_head_title, :payload, :section1_body, :title,
           to: :common

  attributes :card_image, :card_title, :description, :duration, :id,
             :ingredients, :instructions, :mast_head_image,
             :mast_head_title, :payload, :section1_body

  has_many :pillars

  def section1_body
    object.payload['body']
  end

  def duration
    object.payload['prepTime']
  end

  def ingredients
    object.payload['ingredients']
  end

  def instructions
    object.payload['prep/cookingInstructions']
  end

  private

  def common
    @common ||= CommonContent.new(object)
  end
end
