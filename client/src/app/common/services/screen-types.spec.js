import screenTypes from './screen-types';

describe('screen-types', function () {

  const screenSizes = {
    mobile: { min: 0, max: 767 },
    tablet: { min: 768, max: 991 },
    desktop: { min: 992, max: Infinity },
  };

  describe('getScreenTypeMinSize', function () {
    it('recognizes the minimum screen size for mobile', function () {
      const size = screenSizes['mobile']['min'];
      const mobileMin = screenTypes.getScreenTypeMinSize('mobile');

      expect(mobileMin).to.eq(size);
    });

    it('recognizes the minimum screen size for tablet', function () {
      const size = screenSizes['tablet']['min'];
      const tabletMin = screenTypes.getScreenTypeMinSize('tablet');

      expect(tabletMin).to.eq(size);
    });

    it('recognizes the minimum screen size for desktop', function () {
      const size = screenSizes['desktop']['min'];
      const desktopMin = screenTypes.getScreenTypeMinSize('desktop');

      expect(desktopMin).to.eq(size);
    });
  });

  describe('getScreenTypeMaxSize', function () {
    it('recognizes the maximum screen size for mobile', function () {
      const size = screenSizes['mobile']['max'];
      const mobileMax = screenTypes.getScreenTypeMaxSize('mobile');

      expect(mobileMax).to.eq(size);
    });

    it('recognizes the maximum screen size for tablet', function () {
      const size = screenSizes['tablet']['max'];
      const tabletMax = screenTypes.getScreenTypeMaxSize('tablet');

      expect(tabletMax).to.eq(size);
    });

    it('recognizes the maximum screen size for desktop', function () {
      const size = screenSizes['desktop']['max'];
      const desktopMax = screenTypes.getScreenTypeMaxSize('desktop');

      expect(desktopMax).to.eq(size);
    });
  });

});
