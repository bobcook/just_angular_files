const leadIn = function () {
  return {
    restrict: 'E',
    templateUrl: 'app/components/lead-in/lead-in.html',
    replace: true,
    scope: {
      leadHeight: '@',
      leadColor: '@',
      leadImage: '@',
      leadTitle: '@',
      leadDesc: '@?',
    },
  };
};

export default leadIn;
