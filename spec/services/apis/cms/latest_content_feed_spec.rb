require 'rails_helper'

module Apis
  module CMS
    describe LatestContentFeed do
      describe '#import' do
        let(:content_list) do
          [
            {
              pageName: 'ethink-on-target-game',
              pagePath: 'info-2016/ethink-on-target-game/_jcr_content.ss.json',
              lastModified: 'Fri Feb 19 16:20:50 EST 2016'
            },
            {
              pageName: 'ethink-focus-game',
              pagePath: '/info-2016/ethink-focus-game/_jcr_content.ss.json',
              lastModified: 'Fri Feb 19 16:20:06 EST 2016'
            }
          ]
        end

        let(:subject) { LatestContentFeed.new }
        it 'enqueues ImportContentItemJob for each item' do
          allow(ImportContentItemJob).to receive(:perform_later).and_return(nil)
          allow(subject).to receive(:content_list).and_return(content_list)

          expect(ImportContentItemJob).to receive(:perform_later).twice

          subject.import
        end
      end
    end
  end
end
