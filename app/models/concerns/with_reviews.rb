module WithReviews
  extend ActiveSupport::Concern

  def recommend_percentage
    return if reviews.count == 0
    reviews.to_a.count(&:recommend) / reviews.count.to_f
  end
end
