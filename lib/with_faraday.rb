module WithFaraday
  def faraday
    @faraday ||= Faraday.new do |conn|
      conn.request :json
      conn.response :xml, content_type: /\bxml$/
      conn.response :json, content_type: /\bjson$/
      conn.adapter Faraday.default_adapter
    end
  end
end
