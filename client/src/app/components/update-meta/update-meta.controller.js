const UpdateMetaController = function (envName) {
  'ngInject';

  this.robotsVal = envName === 'production' ? this.robots : 'noindex, nofollow';
};

export default UpdateMetaController;
