class CommonContent
  attr_reader :object

  CMS_BASE = 'http://www.aarp.org'

  def initialize(object)
    @object = object
  end

  def card_image
    image_url(payload['cardImage'])
  end

  def mast_head_image
    image_url(payload['mastheadImage'])
  end

  def mast_head_title
    payload['mastheadTitle']
  end

  def effort
    payload['effort']
  end

  def source_materials_citation
    payload['sourceMaterialsCitation']
  end

  def benefits_to_brain_health
    payload['benefitToBrainHealth']
  end

  def section1_body
    payload['section1Body']
  end

  def section2_body
    payload['section2Body']
  end

  def card_title
    payload['cardTitle']
  end

  def id
    object.id
  end

  def title
    mast_head_title
  end

  def description
    payload['description']
  end

  def payload
    @payload ||= object.payload
  end

  private

  def image_url(link)
    return '' unless link
    link.start_with?('http') ? link : CMS_BASE + link
  end
end
