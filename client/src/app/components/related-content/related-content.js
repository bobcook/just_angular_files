const relatedContent = function () {
  return {
    restrict: 'E',
    controller: 'RelatedContentController',
    controllerAs: 'vm',
    templateUrl: 'app/components/related-content/related-content.html',
    bindToController: true,
    scope: {
      resource: '=ssResource',
      resourceName : '@ssResourceName',
    },
    link: function (scope, element, attrs) {
      scope.$watch('vm.resource', function (newResource, _oldResource) {
        scope.vm.loadResource(newResource);
      });
    },
  };
};

export default relatedContent;
