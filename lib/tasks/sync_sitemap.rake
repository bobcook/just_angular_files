namespace :xml_sitemap do
  desc 'Updates sitemap.xml'
  task sync: :environment do
    puts 'syncing sitemap...'
    SyncSitemapJob.perform_later
  end
end
