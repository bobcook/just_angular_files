namespace :content_feeds do
  desc 'import content feeds from CMS'
  task import: :environment do
    Apis::CMS::ImportContentFeeds.new.import
  end
end
