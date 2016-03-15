const assessmentStates = function () {
  'ngInject';

  const states = {
    notStarted: 0,
    started: 1,
    completed: 2,
    anonymous: 3,
  };

  const getState = function (assessmentGroup) {
    if (!assessmentGroup) {
      return states.notStarted;
    } else if (assessmentGroup.completed) {
      return states.completed;
    } else {
      return states.started;
    }
  };

  return {
    getState: getState,
    states: states,
  };
};

export default assessmentStates;
