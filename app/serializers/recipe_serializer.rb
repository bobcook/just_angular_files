class RecipeSerializer < ActiveModel::Serializer
  include PathUtils

  delegate :card_image, :card_title, :description, :duration, :id,
           :mast_head_image, :mast_head_title, :recommend_percentage,
           :section1_body, :title,
           to: :common

  attributes :card_image, :card_title, :description, :duration, :id,
             :ingredients, :instructions, :mast_head_image, :mast_head_title,
             :recommend_percentage, :section1_body, :slug,
             :source_materials_citation, :path_pillar, :path_year,
             :keywords, :seo_title, :seo_description, :canonical_url, :robots

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

  def canonical_url
    object.payload['canonicalUrl']
  end

  def keywords
    object.payload['keywords']
  end

  def robots
    object.payload['robots']
  end

  def seo_title
    object.payload['seoTitle']
  end

  def seo_description
    object.payload['seoDescription']
  end

  private

  def common
    @common ||= CommonContent.new(object)
  end
end
