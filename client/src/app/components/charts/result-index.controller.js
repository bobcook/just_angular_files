const ResultIndexController = function ($scope, $timeout) {
  'ngInject';

  if (this.score > 10) {
    this.score = 10;
  }

  this.isPerfectScore = this.score === 10;

  $timeout(() => {
    this.scorePercent = this.score / 10 * 100;
  }, 500);

};

export default ResultIndexController;
