const saveUserContent = function () {
  return {
    restrict: 'EA',
    controller: 'SaveUserContentController',
    controllerAs: 'vm',
    templateUrl: function (elem, attr) {
      if (attr.ssDisplayType === 'button') {
        return 'app/components/save-user-content/button.html';
      }
      if (attr.ssDisplayType === 'icon') {
        return 'app/components/save-user-content/icon.html';
      }
    },
    bindToController: true,
    scope: {
      displayContent: '=?ssDisplayContent',
      isUserNamespace: '=ssIsUserNamespace',
      isSaved: '=ssIsSaved',
      item: '=ssItem',
      items: '=?ssItems',
      pluralResourceName: '=ssPluralResourceName',
      resource: '=ssResource',
    },
  };
};

export default saveUserContent;
