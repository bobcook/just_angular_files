import screenTypes from './screen-types';

const screenTypeTargetingKeys = {
  mobile: 'phn',
  tablet: 'tblt',
  desktop: 'dsktp',
};

const adSlotsByID = {};

const gptAccount = '/1175/aarpe-eng/health/brain-health';

const configAdSlot = function (id, config) {
  adSlotsByID[id] = googletag.defineSlot(gptAccount, config.sizes, id)
    .addService(googletag.pubads())
    .setTargeting('pos', config.pos)
    .setTargeting('sz', config.sz);
  if (config.sizeMapping) {
    adSlotsByID[id].defineSizeMapping(config.sizeMapping);
  }
};

export default {
  adSlotsByID: adSlotsByID,

  linkDirective: function (scope, element, $timeout) {
    if (scope.$root.userSeesAds()) {
      $timeout(function () {
        $(element).find('.js-ad-container').attr('id', scope.adslot);
        googletag.cmd.push(function () {
          googletag.pubads().refresh([adSlotsByID[scope.adslot]]);
        });
      });
    }
  },

  stateSetUp: function (params, state) {
    googletag.cmd.push(function () {
      googletag.pubads().setTargeting('ointcmp', params.intcmp || 'null');
      googletag.pubads().setTargeting('pgtype', state.pageType || 'null');
    });
  },

  defineAdSlots: function ($window) {
    const largeBannerSize = screenTypes.getScreenTypeMinSize('tablet');
    const screenType = screenTypes.getScreenType($window);
    const bannerAdDynamicSize = screenType === 'mobile' ? '320x50' : '728x90';

    googletag.cmd.push(function () {
      const wideBannerMapping = googletag.sizeMapping()
        .addSize([largeBannerSize, 0], [728, 90])
        .addSize([0, 0], [320, 50])
        .build();

      configAdSlot('aarp-ad-leaderbd', {
        sizes: [[728, 90], [320, 50]],
        sizeMapping: wideBannerMapping,
        pos: 'leader1',
        sz: bannerAdDynamicSize,
      });

      configAdSlot('aarp-ad-onetime', {
        sizes: [[728, 90], [320, 50]],
        sizeMapping: wideBannerMapping,
        pos: 'onetime',
        sz: bannerAdDynamicSize,
      });

      configAdSlot('aarp-ad-300x250', {
        sizes: [300, 250],
        pos: 'rightrail1',
        sz: '300x250',
      });

      googletag.pubads().setTargeting('taxo','brain_health');
      googletag.pubads().setTargeting('cmt','false');
      googletag.pubads().setTargeting('source','philosophie');
      googletag.pubads().setTargeting('grab','all');
      googletag.pubads().setTargeting('adv_accept','commercial');
      googletag.pubads().setTargeting('metakw','staying sharp');
      googletag.pubads().setTargeting('kuid', Krux.user);
      googletag.pubads().setTargeting('ksg', Krux.segments);
      googletag.pubads().setTargeting('dem1','null');
      googletag.pubads().setTargeting('dem2','null');
      googletag.pubads().setTargeting('dem3','null');
      googletag.pubads().setTargeting('dem4','null');
      googletag.pubads().setTargeting('scrn',
        screenTypeTargetingKeys[screenType]);

      googletag.pubads().enableSingleRequest();
      googletag.pubads().disableInitialLoad();
      googletag.enableServices();
    });
  },
};
