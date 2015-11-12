namespace :recent_content_items do
  desc 'import recent content items from CMS'
  task import: :environment do
    ImportRecentContentItemsJob.perform_later
  end
end
