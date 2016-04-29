class ActivitySerializer < ActiveModel::Serializer
  include PathUtils

  delegate :benefits_to_brain_health, :card_image, :card_title, :description,
           :duration, :id, :mast_head_image, :mast_head_title,
           :recommend_percentage, :section1_body, :source_materials_citation,
           :title,
           to: :common

  attributes :benefits_to_brain_health, :card_image, :card_title, :description,
             :duration, :how_to, :id, :mast_head_image, :mast_head_title,
             :recommend_percentage, :recommended_effort,
             :section1_body, :slug, :source_materials_citation, :title,
             :path_pillar, :path_year, :keywords, :seo_title, :seo_description,
             :canonical_url, :robots

  has_many :pillars
  has_one :activity_tracker

  def duration
    common.effort
  end

  def how_to
    object.payload['howTo']
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
