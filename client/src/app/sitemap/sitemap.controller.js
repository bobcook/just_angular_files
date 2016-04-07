const SitemapController = function ($state) {
  'ngInject';

  const stopwords = ['iframe',
                     'search-results',
                     'beta',
                     'failure',
                     'sitemap',
                     'assessment-completion',
                     'assessment-results',
                     '^/assessments/overall',
                     'neuroperformance',
                     'games\\?restrictedRedirect',
                     'recipes\\?restrictedRedirect',
                     '^/\\?restrictedRedirect',
                     '^/working-on',
                     ':'].map(expression => new RegExp(expression));

  const externalUrls = [
    {
      url: 'https://stayingsharp.zendesk.com/hc/en-us',
      title: 'FAQ',
    },
  ];

  const titleReplacements = [
    {
      from: 'Me Assessments Overall',
      to: 'My Assessment Results',
    },
    {
      from: 'Me Working On',
      to: 'My activities',
    },
    {
      from: 'Me',
      to: 'My',
    },
  ];

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
    _.forEach(group, (wordExpression) => {
      isIncluded = wordExpression.test(url);
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

  const buildTitle = (url) => {
    const title = _.startCase(url.split('?')[0]);
    const titleReplacementsReducer =
      (title, replacement) => title.replace(replacement.from, replacement.to);
    return titleReplacements.reduce(titleReplacementsReducer, title);
  };

  const urls = filterUrls(fetchUrls($state.get(), ''))
    .map(url => ({ url: url , title: buildTitle(url) }))
    .concat(externalUrls);

  this.urls = _.sortBy(urls, urlData => urlData.title);
};

export default SitemapController;
