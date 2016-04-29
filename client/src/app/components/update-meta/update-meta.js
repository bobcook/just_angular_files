const updateMeta = function () {
  return {
    templateUrl: 'app/components/update-meta/update-meta.html',
    restrict: 'E',
    scope: {
      title: '@ssTitle',
      description: '@ssDescription',
      keywords: '@ssKeywords',
      robots: '@ssRobots',
      canonicalUrl: '@ssCanonicalUrl',
    },
  };
};

export default updateMeta;
