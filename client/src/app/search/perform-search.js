const PerformSearch = function ($location, Search) {
  'ngInject';

  const searchParams = (currentPage, selectedPillar) => {
    const params = {
      keywords: $location.search().q,
      contentType: $location.search().type,
      page: currentPage,
    };
    if (selectedPillar && selectedPillar.name !== 'All Pillars') {
      params.pillar = selectedPillar.name;
    }
    return params;
  };

  const search = (currentPage, selectedPillar) => {
    return Search.query(searchParams(currentPage, selectedPillar));
  };

  return {
    search: search,
  };
};

export default PerformSearch;
