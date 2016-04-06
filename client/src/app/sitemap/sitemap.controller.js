const SitemapController = function ($state) {
  'ngInject';

  const stopwords = ['restrictedRedirect',
                     'iframe',
                     'search-results',
                     'beta',
                     'failure',
                     'sitemap',
                     ':'];

  const addRoute = (routePrefix, route, routesList) => {
    //Avoid service routes
    if (route.templateUrl && routesList.indexOf(route.url) === -1) {
      routesList.push(routePrefix + route.url);
    }
    return routesList;
  };

  const fetchUrls = (routes, routePrefix) => {
    let filteredRoutes = [];
    _.forEach(routes, (route) => {
      if (route.url) {
        if (route.children) {
          const childrenRoutes =
            fetchUrls(route.children, routePrefix + route.url);
          if (childrenRoutes.length > 0) {
            filteredRoutes = filteredRoutes.concat(childrenRoutes);
            return;
          }
        }
        addRoute(routePrefix, route, filteredRoutes);
      }
    });
    return filteredRoutes;
  };

  const urlIsInGroup = (url, group) => {
    let isIncluded = false;
    _.forEach(group, (word) => {
      isIncluded = url.indexOf(word) > -1;
      return !isIncluded;
    });
    return isIncluded;
  };

  const filterUrlsByGroup = (urlsList, group) => {
    return _.filter(urlsList, (url) => {
      return urlIsInGroup(url, group) === false;
    });
  };

  const filterUrls = (urlsList) => {
    urlsList = filterUrlsByGroup(urlsList, stopwords);
    return urlsList;
  };

  this.urls = filterUrls(fetchUrls($state.get(), '')).sort();
};

export default SitemapController;
