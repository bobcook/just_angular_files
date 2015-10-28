class Pillar < ActiveRecord::Base
  has_many :pillar_categorizations, dependent: :destroy
  has_many :activities,
           through: :pillar_categorizations,
           source: :categorizable,
           source_type: 'Activity'

  has_many :recipes,
           through: :pillar_categorizations,
           source: :categorizable,
           source_type: 'Recipe'

  has_many :articles,
           through: :pillar_categorizations,
           source: :categorizable,
           source_type: 'Article'

  has_many :games,
           through: :pillar_categorizations,
           source: :categorizable,
           source_type: 'Game'

  def self.default_types
    %w(keeping_fit learning_more managing_stress eating_right being_social)
  end
end
