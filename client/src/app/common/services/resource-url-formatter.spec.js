describe('resourceUrlFormatter', function () {

  beforeEach(loadApp);

  let resourceUrlFormatter;

  beforeEach(inject(function (
    _resourceUrlFormatter_
    ) {
    resourceUrlFormatter = _resourceUrlFormatter_;
  }));

  it('If resourceurlformatter has content', function () {
    const type = 'resourcetype';
    const id = '1';
    const pillar = 'pillar';
    const year = '2016';
    const formatterObj = resourceUrlFormatter.format(type, id, pillar, year);

    expect(typeof formatterObj).to.eq('string');
  });

});
