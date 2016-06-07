const presenterDispatch = function (ActivityCardPresenter,
                                    ArticleCardPresenter,
                                    DefaultCardPresenter,
                                    GameCardPresenter,
                                    RecipeCardPresenter,
                                    UserActivityCardPresenter) {
  'ngInject';

  const getPresenter = (contentName) => {
    switch (contentName) {
    case 'Activity': return ActivityCardPresenter;
    case 'Article': return ArticleCardPresenter;
    case 'Game': return GameCardPresenter;
    case 'FreeGame': return GameCardPresenter;
    case 'Recipe': return RecipeCardPresenter;
    case 'UserActivity': return UserActivityCardPresenter;
    default: return DefaultCardPresenter;
    };
  };

  return { getPresenter: getPresenter };
};

export default presenterDispatch;
