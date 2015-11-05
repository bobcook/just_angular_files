class ArticleSerializer < ActiveModel::Serializer
  delegate :id, :card_image, :description, :mast_head_image, :mast_head_title,
           :section1_body, :section2_body, :source_materials_citation,
           to: :common

  attributes :id, :card_title, :card_image, :title, :type, :body_image,
             :description, :duration, :effort, :mast_head_image,
             :mast_head_title, :section1_body, :section2_body,
             :source_materials_citation

  has_many :pillars

  def body_image
    object.payload['bodyImage']
  end

  def duration
    effort
  end

  def effort
    object.payload['effort/readTime']
  end

  def card_title
    object.title # TODO: they should introduce a cardTitle
  end

  private

  def common
    @common ||= CommonContent.new(object)
  end
end
