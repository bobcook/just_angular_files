class Article < ActiveRecord::Base
  has_many :user_articles, dependent: :destroy

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
