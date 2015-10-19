class RelatedContentSanitizer
  include ActiveModel::Validations

  MAX_ITEMS = 100

  attr_reader :params

  delegate :pillars, :recipes, :articles, :activities, to: :params

  def self.known_pillars
    Pillar.default_types
  end

  validates :recipes,
            allow_nil: true,
            numericality: {
              only_integer: true,
              greater_than_or_equal_to: 0,
              less_than: MAX_ITEMS
            }

  validates :articles,
            allow_nil: true,
            numericality: {
              only_integer: true,
              greater_than_or_equal_to: 0,
              less_than: MAX_ITEMS
            }

  validates :activities,
            allow_nil: true,
            numericality: {
              only_integer: true,
              greater_than_or_equal_to: 0,
              less_than: MAX_ITEMS
            }
  validate :pillars_are_known

  def initialize(params)
    @params = OpenStruct.new(params)
  end

  private

  def pillars_are_known
    add_pillars_error unless ((pillars || []) - self.class.known_pillars).empty?
  end

  def add_pillars_error
    errors.add(:pillars, 'is not included in the list of valid pillars')
  end
end
