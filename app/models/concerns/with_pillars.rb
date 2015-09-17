module WithPillars
  extend ActiveSupport::Concern

  class_methods do
    def for_pillar(pillar)
      pillar = pillar.is_a?(Pillar) ? pillar : Pillar.find_by!(slug: pillar)
      pillar.activities.merge(all)
    end
  end

  def pillar_names
    pillars.map(&:name)
  end

  def displayable_pillar_names(separator = ' ')
    pillar_names.join(separator)
  end
end
