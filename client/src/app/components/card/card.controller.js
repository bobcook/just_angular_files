const CardController = function ($filter,
                                 ActivityCardPresenter,
                                 ArticleCardPresenter,
                                 DefaultCardPresenter,
                                 GameCardPresenter,
                                 RecipeCardPresenter) {
  'ngInject';

  const getPresenter = () => {
    switch (this.card.contentName) {
    case 'Activity': return ActivityCardPresenter;
    case 'Article': return ArticleCardPresenter;
    case 'Game': return GameCardPresenter;
    case 'Recipe': return RecipeCardPresenter;
    default: return DefaultCardPresenter;
    };
  };

  getPresenter().forController(this, this.card);
};

export default CardController;
