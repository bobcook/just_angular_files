const DeleteUserContentController = function ($state) {
  'ngInject';

  this.delete = function () {
    this.resource.delete(this.item.id).then(() => {
      _.remove(this.items, (result) => {
        return this.item.id === result.id;
      });
      $state.go(`application.user.${this.parentResource.config.name}s`);
    });
  };
};

export default DeleteUserContentController;
