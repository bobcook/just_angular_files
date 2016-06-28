describe('ActivityPeriodActions', function () {

  beforeEach(loadApp);

  let ActivityPeriodActions;

  beforeEach(inject(function (_ActivityPeriodActions_) {
    ActivityPeriodActions = _ActivityPeriodActions_;
  }));

  const inputs = { type: 'type', period: '30' };

  it('get toggleBinaryPeriod Action', function () {
    const toggleObj = ActivityPeriodActions.edit(inputs['period']);

    // undefined is occur because unknown period and type
    expect(typeof toggleObj).to.eq('undefined');
  });

  it('get openQuantityModal Action', function () {
    const QtyObj = ActivityPeriodActions.edit(inputs['type'],
                                              inputs['period']);

    // undefined is occur because unknown period and type
    expect(typeof QtyObj).to.eq('undefined');
  });

  it('get openScaleModal Action', function () {
    const ScaleObj = ActivityPeriodActions.edit(inputs['type'],
                                                inputs['period']);
    // undefined is occur because unknown period and type
    expect(typeof ScaleObj).to.eq('undefined');
  });

});
