class ImportRecentContentItemsJob < ActiveJob::Base
  queue_as :default

  def perform
    Apis::CMS::ImportContentItems.new.import
  end
end
