namespace :recent_articles do
  desc 'import recent articles from CMS'
  task import: :environment do
    ImportRecentArticlesJob.perform_later
  end
end
