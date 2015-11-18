class ImportContentFeedJob < ActiveJob::Base
  queue_as :default

  def perform(feed)
    content_items(feed).each do |item|
      ImportContentItemJob.perform_later(item)
    end
  end

  private

  def content_item_urls(feed)
    Apis::CMS::ContentFeed.new(feed[:url]).content_item_urls
  end

  def content_items(feed)
    content_item_urls(feed).map do |url|
      {
        url: url,
        type: feed[:type]
      }
    end
  end
end
