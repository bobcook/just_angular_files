class RecipeSerializer < ActiveModel::Serializer
  # TODO: attributes TBD when we get final JSON
  attributes :benefits_to_brain_health, :card_image, :card_title, :description,
             :duration, :id, :ingredients, :instructions, :mast_head_image,
             :mast_head_title, :payload, :section1_body,
             :source_materials_citation

  has_many :pillars

  CMS_BASE = 'http://www.aarp.org'

  def mast_head_image
    image_url(object.payload['mastheadImage'])
  end

  def mast_head_title
    object.payload['mastheadTitle']
  end

  def duration
    object.prep_time # TODO: normalize value w/ Articles
  end

  def description
    object.payload['description']
  end

  def section1_body
    object.payload['body']
  end

  def source_materials_citation
    object.payload['sourceMaterialsCitation']
  end

  def benefits_to_brain_health
    object.payload['benefitToBrainHealth']
  end

  def card_image
    image_url(object.payload['cardImage'])
  end

  def card_title
    object.payload['cardTitle']
  end

  def ingredients
    object.payload['ingredients']
  end

  def instructions
    object.payload['prep/cookingInstructions']
  end

  private

  def image_url(link)
    return '' unless link
    link.start_with?('http') ? link : CMS_BASE + link
  end
end
