describe('AssessmentResultScores', function () {
  beforeEach(loadApp);

  beforeEach(inject(function (AssessmentResultScores, $stats) {
    this.$stats = $stats;
    this.AssessmentResultScores = AssessmentResultScores;
  }));

  describe('scoresAvg', function () {
    it('averages values in a hash of scores', function () {
      const scores = {
        thing1: 3.0,
        thing2: 5.0,
        thing3: 4.0,
      };
      const subject = this.AssessmentResultScores.scoresAvg(scores);
      const expected = this.$stats.mean(_.values(scores));

      expect(subject).to.be.closeTo(expected, 0.01);
    });

    it('is 0 when the hash is empty', function () {
      const scores = {};
      const subject = this.AssessmentResultScores.scoresAvg(scores);
      const expected = 0;

      expect(subject).to.eq(expected);
    });
  });

  describe('multiScoresAvg', function () {
    it('averages multiple sets of values', function () {
      const scores1 = {
        thing1: 3.0,
        thing2: 5.0,
        thing3: 4.0,
      };
      const scores2 = {
        thing1: 2.5,
        thing2: 7.9,
        thing3: 2.3,
      };
      const subject =
        this.AssessmentResultScores.multiScoresAvg([scores1, scores2]);
      const expected =
        this.$stats.mean(_.values(scores1).concat(_.values(scores2)));

      expect(subject).to.be.closeTo(expected, 0.01);
    });

    it('works for just 1 set of values', function () {
      const scores = {
        thing1: 3.0,
        thing2: 5.0,
        thing3: 4.0,
      };
      const subject = this.AssessmentResultScores.multiScoresAvg([scores]);
      const expected = this.$stats.mean(_.values(scores));

      expect(subject).to.be.closeTo(expected, 0.01);
    });

    it('is 0 if there are no hashes passed in', function () {
      const subject = this.AssessmentResultScores.multiScoresAvg([]);
      const expected = 0;

      expect(subject).to.be.eq(0);
    });
  });
});
