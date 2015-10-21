const CardController = function ($filter) {
  'ngInject';

  const MAX_TITLE_LENGTH = 80;
  const MAX_ABSTRACT_LENGTH = 100;

  const cardClassesFor = function (card) {
    switch (card.contentName) {
    case 'Article': return 'article-card';
    case 'Recipe': return 'recipe-card';
    case 'Activity': return 'activity-card small-card';
    default: return '';
    };
  };

  // Defined via ss-card-classes
  this.cardClasses = this.cardClasses || cardClassesFor(this.card);

  this.upperRight = 42; // TODO actual value
  this.upperLeft = _.capitalize(this.card.contentName);
  this.lowerRight = '85%'; // TODO actual value
  this.lowerLeft = this.card.duration;
  this.cardTitle = $filter('limitTo')(this.card.title, MAX_TITLE_LENGTH);
  this.cardAbstract =
    $filter('limitTo')(this.card.description, MAX_ABSTRACT_LENGTH);
  this.cardImage = this.card.cardImage;
  this.resourcePath = this.card.uiSref;
  this.pillars = this.card.pillars;
};

export default CardController;
