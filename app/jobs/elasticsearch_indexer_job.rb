class ElasticsearchIndexerJob < ActiveJob::Base
  queue_as :default

  Client = Elasticsearch::Client.new host: ENV.fetch('ELASTICSEARCH_HOST')

  def perform(operation, resource_name, index_name, record_id)
    klass = resource_name.constantize

    case operation
    when 'index'
      record = klass.find(record_id)
      Client.index(
        index: index_name,
        type: resource_name.downcase,
        id: record.id,
        body: record.__elasticsearch__.as_indexed_json
      )
    when 'delete'
      Client.delete(
        index: index_name,
        type: resource_name.downcase,
        id: record_id
      )
    else fail ArgumentError, "Unknown operation '#{operation}'"
    end
  end
end
