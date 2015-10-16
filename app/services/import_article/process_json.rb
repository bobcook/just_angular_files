module ImportArticle
  class ProcessJson
    def initialize(json_payload)
      @json_payload = json_payload.with_indifferent_access
    end

    def convert_article
      {
        title: json_payload[:'jcr:title'],
        published_at: json_payload[:PrintDate] || json_payload[:PublishDate],
        last_modified: json_payload[:'cq:lastModified'],
        # NOTE: the uuid for a particular article constantly changes,
        # therefore can't use uuid as a unique identifier
        uuid: json_payload[:'jcr:uuid'],
        url: json_payload[:url],
        payload: json_payload
      }
    end

    private

    attr_reader :json_payload
  end
end
