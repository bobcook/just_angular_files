describe('$pillarFiltering ', function () {

  beforeEach(loadApp);

  let $pillarFiltering ;

  beforeEach(inject(function (_$pillarFiltering_) {
    $pillarFiltering  = _$pillarFiltering_;
  }));

  it('Get Pillar Data and Filter Data', function () {
    const filterObj = $pillarFiltering.getPillarData();
    // get the proper pillar object
    expect(typeof filterObj).to.eq('object');
  });

});
