const userPolicies = function userPolicies($http,
                                           $q,
                                           PermissionStore,
                                           API_URL) {
  'ngInject';

  const policyNames = ['paid', 'unpaid'];

  const definePermissions = function definePermissions() {
    _.each(policyNames, definePermission);
  };

  const definePermission = function definePermission(policyName) {
    PermissionStore.definePermission(
      policyName, function () {
        return policyPromise(policyName);
      }
    );
  };

  const policyPromise = (policyName) => {
    return $q((resolve, reject) => {
      getPolicy(policyName).then((res) => {
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
    return $http.get(url, { cache: true });
  };

  return {
    definePermissions: definePermissions,
  };
};

export default userPolicies;
