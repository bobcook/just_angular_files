class RecipeSerializer < ActiveModel::Serializer
  include PathUtils

  delegate :card_image, :card_title, :description, :duration, :id,
           :mast_head_image, :mast_head_title, :recommend_percentage,
           :section1_body, :title,
           to: :common

  attributes :card_image, :card_title, :description, :duration, :id,
             :ingredients, :instructions, :mast_head_image, :mast_head_title,
             :recommend_percentage, :section1_body, :slug,
             :source_materials_citation, :path_pillar, :path_year

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

  def source_materials_citation
    object.payload['sourceMaterialsCitation']
  end

  private

  def common
    @common ||= CommonContent.new(object)
  end
end
