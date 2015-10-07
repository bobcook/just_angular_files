const postHref = function () {
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
        const inputs = _.map(scope.data, makeInput);

        const form = $('<form>', {
          method: 'POST',
          action: scope.url,
          html: inputs,
        });
        form.appendTo(document.body).submit();
      });
    },
  };
};

export default postHref;
