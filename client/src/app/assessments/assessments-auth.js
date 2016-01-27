const $assessmentsAuth = function (ApiRoutes, $http, $postHref, $auth) {
  'ngInject';

  return {
    authenticate: function () {
      // First, retrieve the SAMLRequest to submit to our SAML IdP
      // endpoint
      $http.post(ApiRoutes.MBS_SAML_REQUEST, {
        headers: { Accept: 'application/json' },
      }).then(function (response) {
        const data = {
          'SAMLRequest': response.data.samlRequest,
          'authToken': $auth.sessionToken(),
        };

        // Perform synchronous POST via form submission to assessments auth
        // endpoint, which will redirect to MBS assessments page.
        //
        // Need to POST because authToken + SAMLRequest are too long to
        // fit into query params
        $postHref(ApiRoutes.MBS_AUTH, data);
      });
    },
  };
};

export default $assessmentsAuth;
