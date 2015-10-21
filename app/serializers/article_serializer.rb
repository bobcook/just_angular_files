class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :type, :body_image, :description, :duration, :effort,
             :mast_head_image, :mast_head_title, :section1_body, :section2_body,
             :source_materials_citation

  has_many :pillars

  def body_image
    object.payload['bodyImage']
  end

  def description
    object.payload['description']
  end

  def duration
    '6 mins.' # TODO: real value normalization based on Article type
  end

  def effort
    object.payload['effort/readtime']
  end

  def mast_head_image
    object.payload['mastHeadImage']
  end

  def mast_head_title
    object.payload['mastHeadTitle']
  end

  def section1_body
    object.payload['section1Body']
  end

  def section2_body
    object.payload['section2Body']
  end

  def source_materials_citation
    object.payload['sourceMaterialsCitation']
  end
end
