const $redirectContent = function ($state) {
  'ngInject';

  const redirectCheck = function (resource) {
    if (resource.data === '' && resource.status === 204) {
      $state.go('application.static.not-found');
    }
  };

  return {
    redirectCheck: redirectCheck,
  };
};

export default $redirectContent;
