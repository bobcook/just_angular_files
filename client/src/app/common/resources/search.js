import resourceUrlFormatter from '../services/resource-url-formatter';

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
          obj.uiSref = resourceUrlFormatter().format(obj.resourceType,
                                                     obj.slug,
                                                     obj.pathPillar,
                                                     obj.pathYear);
        };

        results.items.forEach(setUiSref);
        return results;
      },
    }],
  });

  return Search;
};

export default Search;
