class ImportContentJob < ActiveJob::Base
  queue_as :default

  def perform
    Apis::CMS::LatestContentFeed.new.import
  end
end
