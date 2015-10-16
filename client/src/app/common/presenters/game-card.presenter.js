const GameCardPresenter = function (DefaultCardPresenter) {
  'ngInject';

  const Default = DefaultCardPresenter;

  const fieldOverrides = function (controller, game) {
    return {
      cardClasses: controller.cardClasses || 'game-card',
      cardContent: '',
      cardTitle: game.title, // TODO: change when real content fields added
      lowerLeft: `Level: ${game.difficultyLevel}`, // TODO: real implementation
      pillars: null,
      isGame: true,
    };
  };

  return {
    forController: function (controller, game) {
      const overrides = fieldOverrides(controller, game);
      return Default.forController(controller, game, overrides);
    },
  };
};

export default GameCardPresenter;
