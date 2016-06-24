describe('presenterDispatch', function () {

  beforeEach(loadApp);

  let $presenterDispatch;

  beforeEach(inject(function (_presenterDispatch_) {
    $presenterDispatch = _presenterDispatch_;
  }));

  it('get presenterDispatch for Activity', function () {
    const contentName = 'Activity';
    const activityObj = $presenterDispatch.getPresenter(contentName);

    expect(typeof activityObj == 'object').to.eq(true);
  });

  it('get presenterDispatch for Article', function () {
    const contentName = 'Article';
    const activityObj = $presenterDispatch.getPresenter(contentName);
    expect(typeof activityObj == 'object').to.eq(true);
  });

  it('get presenterDispatch for Game', function () {
    const contentName = 'Game';
    const activityObj = $presenterDispatch.getPresenter(contentName);

    expect(typeof activityObj == 'object').to.eq(true);
  });

  it('get presenterDispatch for FreeGame', function () {
    const contentName = 'FreeGame';
    const activityObj = $presenterDispatch.getPresenter(contentName);

    expect(typeof activityObj == 'object').to.eq(true);
  });

  it('get presenterDispatch for Recipe', function () {
    const contentName = 'Recipe';
    const activityObj = $presenterDispatch.getPresenter(contentName);

    expect(typeof activityObj == 'object').to.eq(true);
  });

  it('get presenterDispatch for UserActivity', function () {
    const contentName = 'UserActivity';
    const activityObj = $presenterDispatch.getPresenter(contentName);

    expect(typeof activityObj == 'object').to.eq(true);
  });

  it('get presenterDispatch for default', function () {
    const contentName = 'Other';
    const activityObj = $presenterDispatch.getPresenter(contentName);

    expect(typeof activityObj == 'object').to.eq(true);
  });

});
