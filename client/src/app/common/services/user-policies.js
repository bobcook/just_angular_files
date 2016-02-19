const userPolicies = function userPolicies(PermissionStore, $rootScope) {
  'ngInject';

  const definePermissions = function definePermissions() {
    PermissionStore.definePermission(
      'paid', function () {
        return $rootScope.$currentUser.membershipStatus === 'paid';
      }
    );

    PermissionStore.definePermission(
      'unpaid', function () {
        return $rootScope.$currentUser.membershipStatus !== 'paid';
      }
    );
  };
  return {
    definePermissions: definePermissions,
  };
};

export default userPolicies;
