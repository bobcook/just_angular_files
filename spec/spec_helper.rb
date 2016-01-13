# http://rubydoc.info/gems/rspec-core/RSpec/Core/Configuration

RSpec.configure do |config|
  def indexed_resources
    [Article, Activity, Game, Recipe]
  end

  config.expect_with :rspec do |expectations|
    expectations.syntax = :expect
  end

  config.mock_with :rspec do |mocks|
    mocks.syntax = :expect
    mocks.verify_partial_doubles = true
  end

  # prevent elasticsearch_indexer from executing
  config.before :each do
    indexed_resources.each do |resource|
      allow_any_instance_of(resource).to receive(:elasticsearch_indexer)
    end
  end

  # only enable elasticsearch_indexer for specs with elasticsearch condition
  config.before :each, elasticsearch: true do
    indexed_resources.each do |resource|
      allow_any_instance_of(resource)
        .to receive(:elasticsearch_indexer).and_call_original
    end
  end

  config.after :each, elasticsearch: true do
    indexed_resources.each do |resource|
      resource.__elasticsearch__.client.indices.delete index: '*_test'
    end
  end

  config.order = :random
  config.filter_run focus: true
  config.run_all_when_everything_filtered = true
end
