const postHref = function ($postHref) {
  'ngInject';

  const makeInput = function (value, name) {
    return $('<input type="hidden">').attr('name', name).attr('value', value);
  };

  return {
    restrict: 'A',
    scope: {
      url: '@ssPostHref',
      data: '=ssPostData',
    },
    link: function (scope, element, attrs) {
      element.bind('click', function () {
        $postHref(scope.url, scope.data);
      });
    },
  };
};

export default postHref;
