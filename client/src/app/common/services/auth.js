let $auth = function (ApiRoutes, $http, $localStorage) {
  'ngInject';

  var $storage = $localStorage.auth;
  if ($storage == null) {
    $storage = $localStorage.auth = {};
  }

  let getAuthTokenFrom = function (claimToken) {
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
      delete $storage.sessionToken;
    },

    sessionExists: function () {
      return !!$storage.sessionToken;
    },
  };
};

export default $auth;
