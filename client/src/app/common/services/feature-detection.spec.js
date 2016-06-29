describe('$featureDetection', function () {

  beforeEach(loadApp);

  let $featureDetection;

  beforeEach(inject(function (
    _$featureDetection_
    ) {
    $featureDetection = _$featureDetection_;
  }));

  it('On Touch Start Devise', function () {
    const onTouchObj = $featureDetection.isTouchDevice();

    // getting is touch devise boolean(true/false)
    expect(onTouchObj).to.eq(false);
  });

  it('Shock Flash Wave', function () {
    const hasFlashObj = $featureDetection.hasFlash();

    // getting shock flash boolean(true/false)
    expect(hasFlashObj).to.eq(false);
  });

});
