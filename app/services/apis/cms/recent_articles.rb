module Apis
  module CMS
    class RecentArticles
      def fetch
        [
          {
            'url': 'http://www.aarp.org/money/investing/info-2015/'\
            'dream-homes-in-retirement/_jcr_content.tidy.infinity.json',
            'type': 'basic'
          },
          {
            'url': 'http://www.aarp.org/health/healthy-living/info-2015/'\
            'doctor-patient-relationship/_jcr_content.tidy.infinity.json',
            'type': 'video'
          },
          {
            'url': 'http://www.aarp.org/money/budgeting-saving/info-07-2008/'\
            'seven_things_always_say/_jcr_content.tidy.infinity.json',
            'type': 'slideshow'
          }
        ]
      end
    end
  end
end
