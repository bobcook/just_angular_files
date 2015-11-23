describe('ActivityTrackerQuantityEditPeriodController', function () {
  beforeEach(loadApp);

  it('saves the period when the response values change',
    inject(function ($rootScope, $controller) {
      const $scope = $rootScope.$new();
      const period = {
        update: sinon.stub(),
        activityTrackerResponses: [],
      };

      const controller =
        $controller('ActivityTrackerQuantityEditPeriodController', {
          $scope: $scope,
          period: period,
          close: sinon.stub(),
          type: '',
        });

      $scope.$digest();
      period.update.reset();

      period.activityTrackerResponses.push({ response: 0 });
      $scope.$digest();

      expect(period.update).to.have.been.called;
    })
  );
});
