namespace :elasticsearch do
  desc 'Index CMS content for elasticsearch'
  task index: :environment do
    def index_name(resource)
      "ss_#{resource.name.downcase.pluralize}_#{Rails.env}"
    end

    def create_index(resource)
      resource.__elasticsearch__.create_index!(
        force: true,
        index: index_name(resource)
      )
    end

    [Article, Activity, Game, Recipe].each do |resource|
      create_index(resource)
      resource.import index: index_name(resource)
      puts "Done indexing #{resource}"
    end
  end
end
