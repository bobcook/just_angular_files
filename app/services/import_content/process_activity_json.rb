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

    def activity_tracker_cms
      json_payload[:content][0][:description].strip
    end

    def activity_tracker_id
      ActivityTracker.find_by(cms_name: activity_tracker_cms).try(:id)
    end

    attr_reader :json_payload
  end
end
