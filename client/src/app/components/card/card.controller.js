const CardController = function ($filter) {
  'ngInject';

  const MAX_TITLE_LENGTH = 80;
  const MAX_ABSTRACT_LENGTH = 100;

  const resourceFields = function (card) {
    const resources = {
      Activity: {
        cardClasses: 'activity-card small-card',
        content: 'activity content',
        effort: card.duration,
      },
      Article: {
        cardClasses: 'article-card',
        content: $filter('limitTo')(card.description, MAX_ABSTRACT_LENGTH),
        effort: card.duration,
      },
      Game: {
        cardClasses: 'game-card',
        content: '',
        effort:`Level: ${card.difficultyLevel}`,
      },
      Recipe: {
        cardClasses: 'recipe-card',
        content: 'recipe content',
        effort: card.duration,
      },
      // TODO: add function to use defaults if none are given
      Default: {
        cardClasses: '',
        content: '',
        effort: '',
      },
    };

    return resources[card.contentName] || resources.Default;
  };

  // Defined via ss-card-classes
  this.cardClasses = this.cardClasses || resourceFields(this.card).cardClasses;
  this.upperRight = 42; // TODO actual value
  this.upperLeft = _.capitalize(this.card.contentName);
  this.lowerRight = '85%'; // TODO actual value
  this.lowerLeft = resourceFields(this.card).effort;
  this.cardTitle = $filter('limitTo')(this.card.title, MAX_TITLE_LENGTH);
  this.cardContent = resourceFields(this.card).content;
  this.cardImage = this.card.cardImage;
  this.resourcePath = this.card.uiSref;
  this.pillars = this.card.pillars;
  this.isGame = this.card.contentName === 'Game';
};

export default CardController;
