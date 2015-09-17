class RecipePresenter
  attr_reader :recipe

  delegate :payload, to: :recipe

  def initialize(recipe)
    @recipe = recipe
  end

  def overview
    payload[:overview]
  end

  def benefits
    payload[:benefits]
  end

  def ingredients
    payload[:ingredients]
  end

  def instructions
    payload[:instructions]
  end
end
