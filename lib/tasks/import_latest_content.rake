namespace :latest_content do
  desc 'imports the latest content from CMS'
  task import: :environment do
    ImportContentJob.perform_later
  end
end
