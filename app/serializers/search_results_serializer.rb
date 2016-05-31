class SearchResultsSerializer < ActiveModel::Serializer
  include PathUtils

  delegate :card_image, :description, :id, to: :common
  attributes :id, :title, :card_image, :card_title, :description, :type_label,
             :resource_type, :effort, :slug, :path_pillar, :path_year,
             :seo_description

  has_many :pillars

  def type_label
    object.search_result_type_label
  end

  def resource_type
    object.search_result_resource_type
  end

  def card_title
    title = object.payload['cardTitle']
    title.present? ? title : object.title
  end

  def effort
    case object.class.name
    when 'BasicArticle'
      object.payload['effort/readTime']
    when 'Recipe'
      object.payload['prepTime']
    when 'Activity'
      object.payload['effort']
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
