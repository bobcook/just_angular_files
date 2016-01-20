class Article < ActiveRecord::Base
  include Publishable
  include WithPillars
  include WithKeywords
  include WithElasticsearch
  include WithReviews

  extend FriendlyId
  friendly_id :title, use: :slugged

  has_many :pillar_categorizations, as: :categorizable
  has_many :pillars, through: :pillar_categorizations
  has_many :user_articles, dependent: :destroy
  has_many :reviews, as: :reviewable, dependent: :destroy
  has_many :question_recommendations, as: :recommendable
  has_many :assessment_questions, through: :question_recommendations

  def outdated?(date)
    last_modified < date
  end

  def self.article_types
    %w(basic video slideshow)
  end

  def basic?
    class_is? 'basic'
  end

  def video?
    class_is? 'video'
  end

  def slideshow?
    class_is? 'slideshow'
  end

  private

  def class_is?(type)
    self.class.name.downcase.start_with?(type)
  end

  def resource_name
    'Article'
  end
end
