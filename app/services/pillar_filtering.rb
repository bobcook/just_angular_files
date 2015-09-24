class PillarFiltering
  def initialize(relation, params)
    @relation = relation
    @params = params
  end

  def self.num_per_page
    12
  end

  def collection
    @collection ||= pillar_slug ? filtered_relation : relation
  end

  private

  attr_reader :relation, :params

  def page_num
    @page_num ||= params[:page]
  end

  def pillar_slug
    @pillar_slug ||= params[:pillar]
  end

  def filtered_relation
    @filtered_relation ||= relation.for_pillar(pillar_slug)
  end
end
