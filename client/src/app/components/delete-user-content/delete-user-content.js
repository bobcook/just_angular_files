const deleteUserContent = function () {
  return {
    restrict: 'EA',
    controller: 'DeleteUserContentController',
    controllerAs: 'vm',
    templateUrl: function (elem, attr) {
      if (attr.ssDisplayType === 'button') {
        return 'app/components/delete-user-content/delete-button.html';
      }
      if (attr.ssDisplayType === 'icon') {
        return 'app/components/delete-user-content/delete-icon.html';
      }
    },
    bindToController: true,
    scope: {
      resource: '=ssResource',
      parentResource: '=ssParentResource',
      item: '=ssItem',
      items: '=ssItems',
    },
  };
};

export default deleteUserContent;
