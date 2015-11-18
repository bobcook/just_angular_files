module Apis
  module CMS
    class ContentFeeds
      CMS_BASE_URL = ENV.fetch('CMS_BASE_URL')

      def fetch
        [
          {
            'url': "#{CMS_BASE_URL}/activities/info-2015.infinity.json"
          },
          {
            'url': "#{CMS_BASE_URL}/games/info-2015.infinity.json"
          },
          {
            'url': "#{CMS_BASE_URL}/recipes/info-2015.infinity.json"
          },
          {
            'url': "#{CMS_BASE_URL}/articles/info-2015.infinity.json"
          }
        ]
      end
    end
  end
end
