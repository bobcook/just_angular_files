module ImportContent
  class ProcessActivityJson
    def initialize(json_payload)
      @json_payload = json_payload.with_indifferent_access
    end

    def convert_content
      {
        title: json_payload[:content][0][:mastheadTitle],
        recommended_effort_time: json_payload[:content][0][:effort],
        recommended_effort_frequency: json_payload[:content][0][:effort],
        published_at: json_payload[:created],
        last_modified: json_payload[:lastmodified],
        payload: json_payload[:content][0],
        url: json_payload[:url]
      }
    end

    private

    attr_reader :json_payload
  end
end
