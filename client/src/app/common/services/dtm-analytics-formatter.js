const dtmAnalyticsFormatter = function ($location, $rootScope) {
  'ngInject';

  const getDataLayer = function () {
    return {
      channel: 'staying sharp',
      page: $location.path(),
      section: section(),
      user: user(),
    };
  };

  const user = function () {
    return {
      name: $rootScope.$currentUser.firstName,
      membershipStatus: $rootScope.$currentUser.membershipStatus,
    };
  };

  const sectionMap = {
    art: 'Articles',
    act: 'Activities',
    games: 'Games',
    recipes: 'Recipes',
    me: 'Me',
  };

  const section = function () {
    const sectionArray = _.compact($location.path().split('/'));
    if (sectionArray.length > 0) {
      const section = sectionArray[0];
      return sectionMap[section] || section;
    } else {
      return 'Home';
    }
  };

  return {
    getDataLayer: getDataLayer,
  };
};

export default dtmAnalyticsFormatter;
