describe('$currentModal', function () {

  beforeEach(loadApp);

  let $currentModal;

  beforeEach(inject(function (
    _$currentModal_
    ) {
    $currentModal = _$currentModal_;
  }));

  it('close current model', function () {
    const closeModel = $currentModal.close('closeModal');

    // undefined if we close the current model.
    expect(typeof closeModel).to.eq('undefined');
  });

});
