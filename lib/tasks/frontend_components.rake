namespace :frontend do
  desc 'Pull in latest frontend components from frontend-aarp-azul7 repo'
  task update: :environment do
    frontend_repo_path = ENV.fetch('FRONTEND_REPO')
    puts 'Pulling in latest from frontend-aarp-azul7 repo'
    Frontend.update!(frontend_repo_path)
    puts 'Frontend styles and js updated; changed files should be committed'
  end
end
