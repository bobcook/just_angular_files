describe('$pagination', function () {
  beforeEach(loadApp);

  let $pagination;
  let $promise;
  let $scope;

  beforeEach(inject(function (_$pagination_, _$promise_, $rootScope) {
    $pagination = _$pagination_;
    $promise = _$promise_;
    $scope = $rootScope;
  }));

  const makeSubject = function (origOptions) {
    const options = _.merge(
      {},
      origOptions,
      {
        perPage: 6,
        displayShowMore: true,
        params: {
          pillar: 'all',
        },
      }
    );

    return $pagination.create(options);
  };

  describe('.showMore', function () {
    it('queries the given resource', function () {
      const resource = {
        query: sinon.stub().returns($promise.of({})),
        contentName: 'Article',
      };
      const pageNum = 42;
      const subject = makeSubject({ resource });

      subject.showMore(pageNum);

      expect(resource.query.calledOnce).to.eq(true);
    });

    context('there ARE more pages to be returned', function () {
      it('increments the page count', function (done) {
        const data = ['Some data'];
        const response = {
          status: 200,
          data: data,
        };
        const resource = {
          query: sinon.stub().returns($promise.of(response)),
          contentName: 'Article',
        };
        const pageNum = 1;
        const subject = makeSubject({ resource });

        expect(subject.page).to.eq(1);

        subject.showMore(pageNum).then(function (results) {
          expect(subject.page).to.eq(2);
          done();
        });

        $scope.$digest();
      });

      it('adds the next page of items to .items', function (done) {
        const data = ['some data'];
        const response = {
          status: 206,
          data: data,
        };
        const resource = {
          query: sinon.stub().returns($promise.of(response)),
          contentName: 'Article',
        };
        const pageNum = 42;
        const subject = makeSubject({ resource });

        expect(subject.items).to.be.an('array').that.is.empty;

        subject.showMore(pageNum).then(function (results) {
          expect(results).to.eql(data);
          done();
        });

        $scope.$digest();
      });
    });

    context('there are no more pages to be returned', function () {
      it('increments the page count', function (done) {
        const data = ['Some data'];
        const response = {
          status: 206,
          data: data,
        };
        const resource = {
          query: sinon.stub().returns($promise.of(response)),
          contentName: 'Article',
        };
        const pageNum = 1;
        const subject = makeSubject({ resource });

        expect(subject.page).to.eq(1);

        subject.showMore(pageNum).then(function (results) {
          expect(subject.page).to.eq(2);
          done();
        });

        $scope.$digest();
      });

      it('leaves .completed as false', function (done) {
        const data = ['Some data'];
        const response = {
          status: 206,
          data: data,
        };
        const resource = {
          query: sinon.stub().returns($promise.of(response)),
          contentName: 'Article',
        };
        const pageNum = 42;
        const subject = makeSubject({ resource });

        expect(subject.completed).to.eq(false);

        subject.showMore(pageNum).then(function (results) {
          expect(subject.completed).to.eq(false);
          done();
        });

        $scope.$digest();
      });

      it('sets .completed to true', function (done) {
        const data = ['Some data'];
        const response = {
          status: 200,
          data: data,
        };
        const resource = {
          query: sinon.stub().returns($promise.of(response)),
          contentName: 'Article',
        };
        const pageNum = 42;
        const subject = makeSubject({ resource });

        expect(subject.completed).to.eq(false);

        subject.showMore(pageNum).then(function (results) {
          expect(subject.completed).to.eq(true);
          done();
        });

        $scope.$digest();
      });
    });
  });
});
