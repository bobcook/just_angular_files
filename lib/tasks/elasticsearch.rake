namespace :elasticsearch do
  desc 'Index CMS content for elasticsearch'
  task index: :environment do
    Article.import
    puts 'Done indexing Articles'
    Activity.import
    puts 'Done indexing Activities'
    Game.import
    puts 'Done indexing Games'
    Recipe.import
    puts 'Done indexing Recipes'
  end
end
