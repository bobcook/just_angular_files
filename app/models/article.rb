class Article < ActiveRecord::Base
  include Publishable
  include WithPillars

  has_many :pillar_categorizations, as: :categorizable
  has_many :pillars, through: :pillar_categorizations
  has_many :user_articles, dependent: :destroy
  has_many :article_reviews, dependent: :destroy
  has_many :reviews, as: :reviewable, dependent: :destroy

  def outdated?(date)
    last_modified < date
  end

  def self.article_types
    %w(basic video slideshow)
  end

  article_types.each do |article_type|
    define_method "#{article_type}?" do
      self.class.name.downcase.start_with?(article_type)
    end
  end
end
