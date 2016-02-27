const SubscribeModalController = function (dsoAuth) {
  'ngInject';

  this.subscribeUrl = dsoAuth.dsoSubscribeAuth;
  this.login = dsoAuth.login;

  console.log(this);
};

export default SubscribeModalController;
