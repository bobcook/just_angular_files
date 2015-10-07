const $auth = function (ApiRoutes, $http, $localStorage) {
  'ngInject';

  let $storage = $localStorage.auth;
  if ($storage == null) {
    $storage = $localStorage.auth = {};
  }

  const getAuthTokenFrom = function (claimToken) {
    return $http.get(ApiRoutes.AUTH_TOKEN({ id: claimToken }));
  };

  return {
    createSession: function (claimToken) {
      return getAuthTokenFrom(claimToken).then(function (response) {
        $storage.sessionToken = response.data;
        return true;
      });
    },

    destroySession: function () {
      return $http.delete(ApiRoutes.SESSION_DESTROY, {
        headers: { Accept: 'application/json' },
      }).then(function () {
        delete $storage.sessionToken;
        return true;
      });
    },

    sessionExists: function () {
      return !!$storage.sessionToken;
    },

    sessionToken: function () {
      return $storage.sessionToken;
    },
  };
};

export default $auth;
