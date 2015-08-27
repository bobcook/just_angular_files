class ImportRecentArticlesJob < ActiveJob::Base
  queue_as :default

  def perform
    Apis::CMS::ImportArticles.new.import
  end
end
