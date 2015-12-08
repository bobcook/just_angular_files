describe('FutureBrainStats', function () {
  beforeEach(loadApp);

  beforeEach(inject(function (FutureBrainStats) {
    this.FutureBrainStats = FutureBrainStats;
  }));

  describe('zScore', function () {
    // Expected values come from Standard Normal Table, see:
    // http://www.sjsu.edu/faculty/gerstman/EpiInfo/z-table.htm

    it('gives number of standard deviations above / below mean', function () {
      const score = 8.0;
      const expected = 1.25;

      expect(this.FutureBrainStats.zScore(score)).to.eql(expected)
    });

    it('is negative if the number is below the mean', function () {
      const score = 4.0;
      const expected = -0.75;

      expect(this.FutureBrainStats.zScore(score)).to.eql(expected)
    });
  });

  describe('percentile', function () {
    it('returns the right value for score 7.5', function () {
      const score = 7.5;
      const expected = 0.841345;

      expect(this.FutureBrainStats.percentile(score))
        .to.be.closeTo(expected, 0.001)
    });

    it('returns the right value for score 6.5', function () {
      const score = 6.5;
      const expected = 0.691463;

      expect(this.FutureBrainStats.percentile(score))
        .to.be.closeTo(expected, 0.001)
    });

    it('returns the right value for score 5.5', function () {
      const score = 5.5;
      const expected = 0.50;

      expect(this.FutureBrainStats.percentile(score))
        .to.be.closeTo(expected, 0.001)
    });

    it('returns the right value for score 2.6', function () {
      const score = 2.6;
      const expected = 0.073529;

      expect(this.FutureBrainStats.percentile(score))
        .to.be.closeTo(expected, 0.001)
    });

    it('returns the right value for score 0', function () {
      const score = 0;
      const expected = 0;

      expect(this.FutureBrainStats.percentile(score))
        .to.be.closeTo(expected, 0.01)
    });
  });
});
