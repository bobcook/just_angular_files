describe('$auth', function () {
  beforeEach(loadApp);

  let $auth;
  let $localStorage;

  beforeEach(function () {
    inject(function (_$auth_,_$localStorage_) {
      $auth = _$auth_;
      $localStorage = _$localStorage_;
    });
  });

  it('create auth token', function () {
    const claimToken = 'abc';
    const result = $auth.createSession(claimToken);

    expect(typeof result).to.eq('object');
  });

  it('set session of auth token', function () {
    const claimToken = 'abc';
    $auth.setSessionToken(claimToken);

    expect($localStorage.auth.sessionToken).to.eq(claimToken);
  });

  it('destroy session of auth token', function () {
    const claimToken = 'abc';

    // it will set token
    $auth.setSessionToken(claimToken);

    $auth.destroySession();

    // after delete, it shows undefined
    expect($localStorage.auth.sessionToken).to.eq(undefined);
  });

  describe('check if session exists', function () {

    it('if session present', function () {
      const claimToken = 'abc';

      // it will set token
      $auth.setSessionToken(claimToken);

      const session = $auth.sessionExists();
      expect(session).to.eq(true);
    });

    it('if no session present', function () {

      const session = $auth.sessionExists();
      expect(session).to.eq(false);
    });

  });

  it('return session', function () {
    const claimToken = 'abc';

    // it will set token
    $auth.setSessionToken(claimToken);
    const getToken = $auth.sessionToken();

    //return the set token
    expect(getToken).to.eq('abc');
  });

});

