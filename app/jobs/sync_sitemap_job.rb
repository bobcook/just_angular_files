class SyncSitemapJob < ActiveJob::Base
  queue_as :default

  RETRIES = 5

  def perform(retries = RETRIES)
    puts "Performing sitemap sync. #{retries} left"
    begin
      SitemapSyncer.sync!
    rescue ::SitemapSyncer::SitemapSyncError
      if retries > 0
        puts "FAILED: trying again in #{wait_time(retries - 1)} seconds"
        schedule_retry(retries - 1)
      else
        puts 'FAILED: out of retries'
        raise SyncSitemapJobIncomplete
      end
    end
  end

  private

  def schedule_retry(retries)
    SyncSitemapJob.set(wait: wait_time(retries)).perform_later(retries)
  end

  def wait_time(remaining_retries)
    (RETRIES - remaining_retries).minutes
  end

  class SyncSitemapJobIncomplete < StandardError; end
end
