class PillarQuerying
  attr_reader :pillar_names, :counts

  def initialize(options = {})
    @pillar_names = options.fetch(:pillars, Pillar.default_types)
    @counts = options.fetch(:counts, {}).with_indifferent_access
  end

  def query
    activities + recipes + articles + games
  end

  def activities
    @activities ||= query_pillars_for :activities
  end

  def articles
    @articles ||= query_pillars_for :articles
  end

  def recipes
    @recipes ||= query_pillars_for :recipes
  end

  def games
    @games ||= query_pillars_for :games
  end

  private

  def query_pillars_for(relation_name)
    results = pillars.flat_map do |pillar|
      pillar.send(relation_name)
    end
    results.uniq.sample count_for(relation_name.to_s)
  end

  def pillars
    @pillars ||= Pillar.unscoped.where(slug: pillar_names)
  end

  def count_for(resource_name)
    counts.fetch(resource_name, 0)
  end
end
