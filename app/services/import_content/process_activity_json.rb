module ImportContent
  class ProcessActivityJson
    def initialize(json_payload)
      @json_payload = json_payload.with_indifferent_access
    end

    def convert_content
      {
        title: json_payload[:content][0][:mastheadTitle],
        recommended_effort: json_payload[:content][0][:effort],
        published_at: json_payload[:created],
        last_modified: json_payload[:lastModified],
        payload: json_payload[:content][0],
        cms_url: json_payload[:cms_url],
        activity_tracker_id: activity_tracker_id
      }
    end

    private

    # TODO: Currently we only have binary trackers so hardcoding '1' for the id
    # will work. When we add other activity tracker types, we need to grab the
    # real id.
    def activity_tracker_id
      1
    end

    attr_reader :json_payload
  end
end
