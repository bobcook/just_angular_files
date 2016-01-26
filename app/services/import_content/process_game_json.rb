module ImportContent
  class ProcessGameJson
    def initialize(json_payload)
      @json_payload = json_payload.with_indifferent_access
    end

    def convert_content
      {
        title: json_payload[:content][0][:title],
        published_at: json_payload[:created],
        last_modified: json_payload[:lastModified],
        payload: json_payload[:content][0],
        cms_url: json_payload[:cms_url]
      }
    end

    private

    attr_reader :json_payload
  end
end
