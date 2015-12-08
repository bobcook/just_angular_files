const $pillarFiltering = function (Pillar, $filter, $q) {
  'ngInject';

  const getSelectAllPillar = () => {
    if (this.pillarData && this.pillarData.selectAll) {
      return this.pillarData.selectAll;
    }

    return new Pillar({
      id: 0, name: 'All Pillars', slug: 'all', displayName: 'ALL',
    });
  };

  const makePillarData = function (allPillars) {
    const selectAll = getSelectAllPillar();
    allPillars.push(selectAll);
    const sortedPillars = _.sortBy(allPillars, 'id');
    const otherPillars = _.drop(sortedPillars, 1);

    return $q.resolve({
      selectAll: selectAll,
      otherPillars: otherPillars,
      pillars: sortedPillars,
    });
  };

  this.getPillarData = function () {
    if (this.pillarData) { return $q.resolve(this.pillarData); }

    const setPillarData = (pillarData) => {
      this.pillarData = pillarData;
      return this.pillarData;
    };

    return Pillar.query().then(makePillarData).then(setPillarData);
  };

  this.pillarBySlug = (pillarSlug) => {
    const findPillar = (pillars) => {
      return _.find(this.pillarData.pillars, function (pillar) {
        return pillar.slug === pillarSlug;
      });
    };

    return this.getPillarData().then(findPillar);
  };

  this.pillarByDisplayName = (displayName) => {
    const findPillar = (pillars) => {
      return _.find(this.pillarData.pillars, function (pillar) {
        return pillar.displayName === $filter('upcase')(displayName);
      });
    };

    return this.getPillarData().then(findPillar);
  };

  this.filterByPillar = (pillar, items) => {
    const doFilter = () => {
      const selectAll = this.pillarData.selectAll;
      const filterPillar = pillar || selectAll;

      if (filterPillar.slug === selectAll.slug) { return items; }

      const results = _.filter(items, function (item) {
        return _.contains(_.pluck(item.pillars, 'slug'), filterPillar.slug);
      });
      return results;
    };

    return this.getPillarData().then(doFilter);
  };

  // mixedContent =
  // [
  //   {articles: ..., recipes: ..., $$hashKey: 'string'},
  //   {articles: ..., recipes: ..., $$hashKey: 'string'}
  // ]
  this.filterMixedContentByPillar = (pillar, mixedContent) => {
    const doFilter = () => {
      const selectAll = this.pillarData.selectAll;
      const filterPillar = pillar || selectAll;
      const results = [];

      if (filterPillar.slug === selectAll.slug) { return mixedContent; }

      _.forEach(mixedContent, (pageContent, page) => {
        results.push({});
        _.forEach(pageContent, (items, key) => {
          // skip $$hashKey: 'string'
          if (typeof items === 'object') {
            this.filterByPillar(filterPillar, items).then(function (item){
              results[page][key] = item;
            });
          };
        });
      });
      return results;
    };

    return this.getPillarData().then(doFilter);
  };

  return this;
};

export default $pillarFiltering;
