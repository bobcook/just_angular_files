const $auth = function (ApiRoutes, $http, $localStorage, $promise) {
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

    setSessionToken: function (token) {
      $storage.sessionToken = token;
    },

    destroySession: function () {
      delete $storage.sessionToken;
      return $promise.of(true);
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
