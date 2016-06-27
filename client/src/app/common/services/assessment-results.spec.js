describe('$assessmentResults', function () {

  beforeEach(loadApp);

  let $assessmentResults;
  let $http;

  beforeEach(inject(function (
    _$assessmentResults_,
    _$http_
    ) {
    $assessmentResults = _$assessmentResults_;
    $http = _$http_;
  }));

  describe('assessment results enqueue for retrieval', function () {

    it('if userAssessment has ID', function () {
      const userAssessment =  { id: 1 };
      const redirectStatus = $assessmentResults.enqueueForRetrieval(
                                userAssessment
                              );

      expect(typeof redirectStatus.catch).to.eq('function');
    });

  });
});
