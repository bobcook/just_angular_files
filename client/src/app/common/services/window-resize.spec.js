describe('$windowResize', function () {

  beforeEach(loadApp);

  let $windowResize;

  beforeEach(inject(function (
    _$windowResize_
    ) {
    $windowResize = _$windowResize_;
  }));

  it('resize window', function () {
    const bindResize = '992';
    const windowResize = $windowResize.bind('resize', bindResize);

    expect(typeof windowResize).to.eq('undefined');
  });

});
