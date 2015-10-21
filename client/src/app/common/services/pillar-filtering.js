const $pillarFiltering = function (Pillar, $q) {
  'ngInject';

  const getSelectAllPillar = () => {
    if (this.pillarData && this.pillarData.selectAll) {
      return this.pillarData.selectAll;
    }

    return new Pillar({ id: 0, name: 'All Pillars', slug: 'all' });
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

  return this;
};

export default $pillarFiltering;