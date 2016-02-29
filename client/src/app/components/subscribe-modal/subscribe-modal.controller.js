const SubscribeModalController = function (dsoAuth) {
  'ngInject';

  this.subscribeUrl = dsoAuth.dsoSubscribeAuth;
  this.login = dsoAuth.login;
};

export default SubscribeModalController;
