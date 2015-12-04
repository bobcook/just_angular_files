const GameCardPresenter = function ($presenterUtils,
                                    DefaultCardPresenter) {
  'ngInject';

  const Default = DefaultCardPresenter;

  const overrideFields = function (game, controller) {
    return {
      cardClasses: controller.cardClasses || 'game-card',
      cardContent: '',
      cardTitle: game.title, // TODO: change when real content fields added
      pillars: null,
      isGame: true,
    };
  };

  return {
    // forController :: Controller -> Resource -> MutatedController
    forController:
      $presenterUtils.withFieldsFrom(Default.defaultFields, overrideFields),
  };
};

export default GameCardPresenter;
