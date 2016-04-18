class ArticleSerializer < ActiveModel::Serializer
  include PathUtils

  delegate :id, :card_image, :description, :mast_head_image, :mast_head_title,
           :recommend_percentage, :section1_body, :section2_body,
           :source_materials_citation,
           to: :common

  attributes :id, :card_title, :card_image, :title, :type, :body_image,
             :description, :duration, :effort, :mast_head_image,
             :mast_head_title, :recommend_percentage, :section1_body,
             :section2_body, :slug, :source_materials_citation,
             :content_source_branding_image, :path_pillar, :path_year,
             :last_modified

  has_many :pillars

  CMS_BASE = 'http://www.aarp.org'

  def body_image
    object.payload['bodyImage']
  end

  def content_source_branding_image
    common.send(:image_url, object.payload['contentSourceBrandingImage'])
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
