const CardController = function ($filter) {
  'ngInject';

  const MAX_TITLE_LENGTH = 80;

  this.cardClasses = this.cardClasses || ''; // Defined via ss-card-classes
  this.upperRight = 42; // TODO actual value
  this.upperLeft = _.capitalize(this.card.constructor.config.name);
  this.lowerRight = '85%'; // TODO actual value
  this.lowerLeft = this.card.recommendedEffortTime || this.card.prepTime;
  this.cardTitle = $filter('limitTo')(this.card.title, MAX_TITLE_LENGTH);
  this.cardImage = this.card.cardImage;
  this.resourcePath = this.card.uiSref;
  this.pillars = this.card.pillars;
};

export default CardController;
