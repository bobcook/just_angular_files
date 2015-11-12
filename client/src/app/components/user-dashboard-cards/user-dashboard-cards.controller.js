const UserDashboardCardsController = function () {
  'ngInject';

  this.cardClasses = this.cardClasses || ''; // via ss-card-classes
  this.perPage = this.perPage || 6; // via ss-per-page
  this.perRow = this.perRow || 3; // via ss-per-row
  this.items = this.items || []; // via ss-items

  this.shownItems = this.items;

    // TODO: extract out duplication here, in explore page, and dashboard
  this.itemsInRow = function (offset, items) {
    const chunks = _.isEmpty(items) ? [] : _.chunk(items, this.perRow);
    const chunkNum = offset / this.perRow;
    return chunks[chunkNum];
  };

    // TODO: extract out duplication here, in explore page, and dashboard
  this.setShownItems = (newItems) => {
    this.shownItems = newItems;
  };
};

export default UserDashboardCardsController;
