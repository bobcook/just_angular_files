const userPolicies = function userPolicies($http,
                                           $q,
                                           PermissionStore,
                                           API_URL) {
  'ngInject';

  const policies = ['paid', 'unpaid'];

  const definePermissions = function definePermissions() {
    for (const policy of policies) {
      definePermission(policy);
    };
  };

  const definePermission = function definePermission(policyName) {
    PermissionStore.definePermission(
      policyName, function () {
        return policyPromise(policyName);
      }
    );
  };

  const policyPromise = function policyPromise(policyName) {
    return $q(function (resolve, reject) {
      getPolicy(policyName).then(function (res) {
        if (res.data.access) {
          resolve(res.data.access);
        } else {
          reject(res.data.access);
        };
      });
    });
  };

  const getPolicy = function getPolicy(policyName) {
    const url = `${API_URL}/api/v1/policies/${policyName}`;
    return $http.get(url);
  };

  return {
    definePermissions: definePermissions,
  };
};

export default userPolicies;
