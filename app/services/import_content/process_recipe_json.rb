module ImportContent
  class ProcessRecipeJson
    def initialize(json_payload)
      @json_payload = json_payload.with_indifferent_access
    end

    def convert_content
      {
        title: json_payload[:content][0][:mastheadTitle],
        prep_time: json_payload[:content][0][:prepTime],
        published_at: json_payload[:created],
        last_modified: json_payload[:lastmodified],
        payload: json_payload[:content][0],
        cms_url: json_payload[:cms_url]
      }
    end

    private

    attr_reader :json_payload
  end
end
