class SitemapSyncer
  def self.sync!
    faraday.post '/generate-xml-sitemap'
  rescue
    raise SitemapSyncError
  end

  def self.faraday
    Faraday.new(url: ENV.fetch('FRONTEND_URL')) do |conn|
      conn.adapter Faraday.default_adapter
    end
  end

  class SitemapSyncError < StandardError; end
end
