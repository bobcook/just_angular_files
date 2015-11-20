class PillarCategorization < ActiveRecord::Base
  belongs_to :pillar, inverse_of: :pillar_categorizations
  belongs_to :categorizable, polymorphic: true

  def pillar_name
    @pillar_name ||= pillar.name
  end
end
