describe('modalStateHelper', function () {
  'ngInject';
  beforeEach(loadApp);

  let modalStateHelper;

  beforeEach(inject(function (_modalStateHelper_) {
    modalStateHelper = _modalStateHelper_;
  }));

  const modalStateHelperProvider = {
    name: 'activity-saved',
    templateUrl: 'app/components/saved-modal/saved-modal.html',
    controller: 'ActivityModalController',
    controllerAs: 'vm',
  };

  it('Show Modal State Helper', function () {
    const modalStateHelperObj = modalStateHelper(modalStateHelperProvider);
    expect(typeof modalStateHelperObj).to.eq('object');
  });

});
