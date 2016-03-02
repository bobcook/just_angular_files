const CardController = function ($filter,
                                 ActivityCardPresenter,
                                 ArticleCardPresenter,
                                 DefaultCardPresenter,
                                 GameCardPresenter,
                                 RecipeCardPresenter) {
  'ngInject';

  const getPresenter = () => {
    const contentName = this.card.recommendableType ?
      this.card.recommendableType : this.card.contentName;

    switch (contentName) {
    case 'Activity': return ActivityCardPresenter;
    case 'Article': return ArticleCardPresenter;
    case 'Game': return GameCardPresenter;
    case 'FreeGame': return GameCardPresenter;
    case 'Recipe': return RecipeCardPresenter;
    default: return DefaultCardPresenter;
    };
  };

  const content = this.card.recommendable ? this.card.recommendable : this.card;
  getPresenter().forController(this, content);
};

export default CardController;
