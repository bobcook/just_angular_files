const Search = function (API_URL, railsResourceFactory, railsSerializer) {
  'ngInject';

  const url = `${API_URL}/api/v1/search`;

  const Search = railsResourceFactory({
    name: 'search',
    url: url,
    // since the returned json has 'items' and 'total_count' fields, use
    // interceptors to add uiSref property to each record in 'items'
    interceptors: [{
      afterResponse: function (results) {
        const setUiSref = function (obj) {
          const content = obj.contentType.toLowerCase();
          obj.uiSref =
            `application.${content}({ id: '${obj.slug}', ` +
            `pillar: '${obj.pathPillar}', year: '${obj.pathYear}' })`;
        };

        results.items.forEach(setUiSref);
        return results;
      },
    }],
  });

  return Search;
};

export default Search;
