module WithElasticsearch
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model
    index_name index_name
    after_save { elasticsearch_indexer('index') }
    after_destroy { elasticsearch_indexer('delete') }
  end

  private

  def elasticsearch_indexer(action)
    ElasticsearchIndexerJob
      .perform_later(action, resource_name, index_name, id)
  end

  def index_name
    "ss_#{resource_name.downcase.pluralize}_#{Rails.env}"
  end

  def resource_name
    self.class.name
  end
end
