import screenTypes from './screen-types';

const screenTypeTargetingKeys = {
  mobile: 'phn',
  tablet: 'tblt',
  desktop: 'dsktp',
};

export default {
  stateSetUp: function (doubleClick, params, state) {
    doubleClick.setPageTargeting('ointcmp', params.intcmp || 'null');
    doubleClick.setPageTargeting('pgtype', state.pageType || 'null');
    doubleClick.refreshTargeting();
  },

  defineAdSlots: function (doubleClickProvider, $window) {
    const screenType = screenTypes.getScreenType($window);

    const bannerAdDynamicSize = screenType === 'mobile' ? '320x50' : '728x90';

    doubleClickProvider.defineSlot(
      '/1175/aarpe-eng/health/brain-health',
      [[728, 90], [320, 50]],
      'aarp-ad-leaderbd', [
        { id: 'sz', value: bannerAdDynamicSize },
        { id: 'pos', value: 'leader1' },
      ]
    ).defineSlot(
      '/1175/aarpe-eng/health/brain-health',
      [[728, 90], [320, 50]],
      'aarp-ad-onetime', [
        { id: 'sz', value: bannerAdDynamicSize },
        { id: 'pos', value: 'onetime' },
      ]
    ).defineSlot(
      '/1175/aarpe-eng/health/brain-health',
      [300, 250],
      'aarp-ad-300x250', [
        { id: 'sz', value: '300x250' },
        { id: 'pos', value: 'rightrail1' },
      ]
    ).defineSlot(
      '/1175/aarpe-eng/health/brain-health',
      [300, 250],
      'aarp-ad2-300x250', [
        { id: 'sz', value: '300x250' },
        { id: 'pos', value: 'rightrail1' },
      ]
    ).defineSlot(
      '/1175/aarpe-eng/health/brain-health',
      [300, 600],
      'aarp-ad-300x600', [
        { id: 'sz', value: '300x600' },
        { id: 'pos', value: 'rightrail2' },
      ]
    );

    const largeBannerSize = screenTypes.getScreenTypeMinSize('tablet');

    doubleClickProvider.defineSizeMapping('aarp-ad-leaderbd')
      .addSize([largeBannerSize, 0], [728, 90])
      .addSize([0, 0], [320, 50]);

    doubleClickProvider.defineSizeMapping('aarp-ad-onetime')
      .addSize([largeBannerSize, 0], [728, 90])
      .addSize([0, 0], [320, 50]);

    doubleClickProvider.setPageTargeting('taxo', 'brain_health');
    doubleClickProvider.setPageTargeting('cmt', 'false');
    doubleClickProvider.setPageTargeting('source', 'philosophie');
    doubleClickProvider.setPageTargeting('grab', 'all');
    doubleClickProvider.setPageTargeting('adv_accept', 'commercial');
    doubleClickProvider.setPageTargeting('metakw', 'staying sharp');
    doubleClickProvider.setPageTargeting('kuid', Krux.user);
    doubleClickProvider.setPageTargeting('ksg', Krux.segments);
    doubleClickProvider.setPageTargeting('dem1', '[dynamic]');
    doubleClickProvider.setPageTargeting('dem2', '[dynamic]');
    doubleClickProvider.setPageTargeting('dem3', '[dynamic]');
    doubleClickProvider.setPageTargeting('dem4', '[dynamic]');
    doubleClickProvider.setPageTargeting('scrn',
      screenTypeTargetingKeys[screenType]);
  },
};
