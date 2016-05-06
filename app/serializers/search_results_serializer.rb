class SearchResultsSerializer < ActiveModel::Serializer
  include PathUtils

  delegate :card_image, :description, :id, to: :common
  attributes :id, :title, :card_image, :card_title, :description, :content_type,
             :effort, :slug, :path_pillar, :path_year, :seo_description

  has_many :pillars

  def card_title
    title = object.payload['cardTitle']
    title.present? ? title : object.title
  end

  def content_type
    case object.class.name
    when 'BasicArticle'
      'Article'
    else
      object.class.name
    end
  end

  def effort
    case object.class.name
    when 'BasicArticle'
      object.payload['effort/readTime']
    when 'Recipe'
      object.payload['prepTime']
    when 'Activity'
      common.effort
    end
  end

  def seo_description
    object.payload['seoDescription']
  end

  private

  def common
    @common ||= CommonContent.new(object)
  end
end
