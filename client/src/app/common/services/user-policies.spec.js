describe('userPolicies', function () {

  beforeEach(loadApp);

  let userPolicies;

  beforeEach(inject(function (
    _userPolicies_
    ) {
    userPolicies = _userPolicies_;
  }));

  it('define policy Permissions', function () {
    const PermissionsObj = userPolicies.definePermissions();
    // permissions undefined because unknow policyname here
    expect(typeof PermissionsObj).to.eq('undefined');
  });

});
