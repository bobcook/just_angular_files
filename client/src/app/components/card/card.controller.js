const CardController = function ($filter,
                                 presenterDispatch) {
  'ngInject';

  const getPresenter = () => {
    const contentName = this.card.recommendableType ?
      this.card.recommendableType : this.card.contentName;

    return presenterDispatch.getPresenter(contentName);
  };

  const content = this.card.recommendable ? this.card.recommendable : this.card;
  getPresenter().forController(this, content);
};

export default CardController;
