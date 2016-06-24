describe('$redirectContent', function () {

  beforeEach(loadApp);

  let $redirectContent;
  let $state;

  beforeEach(inject(function (
    _$redirectContent_,
    _$state_
    ) {
    $redirectContent = _$redirectContent_;
    $state = _$state_;
  }));

  it('If resource has no content', function () {
    const resource =  { data: '', status: 204 };
    const redirectStatus = $redirectContent.redirectCheck(resource);

    //assign transition event(redirect content) if resource data is nil
    expect($state.transition != null).to.eq(true);
  });

  it('If resource has content', function () {
    const resource =  { data: 'new data', status: 200 };
    const redirectStatus = $redirectContent.redirectCheck(resource);

    //Not assign transition event(redirect content) if resource data present
    expect($state.transition).to.eq(null);
  });

});
