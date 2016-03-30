const systemMessage = function () {
  return {
    restrict: 'E',
    templateUrl: 'app/components/system-message/system-message.html',
    controller: 'SystemMessageController',
    controllerAs: 'vm',
    bindToController: true,
    scope: {},
  };
};

export default systemMessage;
