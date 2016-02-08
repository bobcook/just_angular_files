describe('$promise', function () {
  beforeEach(loadApp)

  beforeEach(inject(function ($rootScope, $promise) {
    this.$scope = $rootScope;
    this.$promise = $promise;
  }));

  describe('.of', function () {
    xit('returns a resolved promise', function () {
      const expected = 43;
      const promiseOf42 = this.$promise.of(expected);

      promiseOf42.then(function (result) {
        expect(result).to.eql(expected);
      });

      this.$scope.$digest();
    });
  });

  describe('.accumulate', function () {
    xit('returns a promise of an accumulated object', function () {
      const startState = { hi: 'there' };
      const expected = {
        hi: 'there',
        hope: 'this',
        thing: 'works',
      };

      const firstPromise = (results) => {
        return this.$promise.of({ hope: 'this' });
      };

      const secondPromise = (results) => {
        return this.$promise.of({ thing: 'works' });
      };

      this.$promise.accumulate(startState, [
        firstPromise,
        secondPromise
      ]).then(function (results) {
        expect(results).to.eql(expected);
      });

      this.$scope.$digest();
    });
  });

  describe('.as', function () {
    xit('adds the promised value as the key in the accumulated state',
      function () {
        const $p = this.$promise;

        const expected = {
          first: { hope: 'this' },
          second: { thing: 'works' },
        };

        const firstPromise = (results) => {
          return $p.of({ hope: 'this' });
        };

        const secondPromise = (results) => {
          return $p.of({ thing: 'works' });
        };

        $p.accumulate({}, [
          $p.as('first', firstPromise),
          $p.as('second', secondPromise)
        ]).then(function (results) {
          expect(results).to.eql(expected);
        });

        this.$scope.$digest();
      });
  });
});
