const GameReview = function ($stateParams, API_URL, railsResourceFactory) {
  'ngInject';

  const GameReview = railsResourceFactory({
    name: 'review',
    url: `${API_URL}/api/v1/games/{{gameId}}/reviews`,
  });

  // "Class-level" properties
  GameReview.extend({
    contentName: 'Review',
  });

  // "Instance-level" properties
  GameReview.include({
    contentName: 'Review',
  });

  return GameReview;
};

export default GameReview;
