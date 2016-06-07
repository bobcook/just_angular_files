const UserDashboardCardsController = function () {
  'ngInject';

  this.resource = this.resource || null; // Should be defined via ss-resource
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

  this.showInlineEncouragementMessage = (offset) => {
    return !noRemainder() && lastItem(offset);
  };

  this.showStandAloneEncouragementMessage = () => {
    return noRemainder();
  };

  const noRemainder = () => {
    return this.shownItems.length % this.perRow === 0;
  };

  const lastItem = (offset) => {
    return this.itemsInRow(offset, this.shownItems).length + offset ===
      this.shownItems.length;
  };

    // TODO: extract out duplication here, in explore page, and dashboard
  this.setShownItems = (newItems) => {
    this.shownItems = newItems;
  };
};

export default UserDashboardCardsController;
