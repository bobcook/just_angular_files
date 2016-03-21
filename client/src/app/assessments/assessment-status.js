const AssessmentStatus = function ($assessmentsAuth,
                                   $state,
                                   $assessmentResults,
                                   $q,
                                   $rootScope,
                                   $timeout,
                                   $loadCurrentUser,
                                   UserAssessmentGroup,
                                   AssessmentResponse,
                                   Airbrake) {
  'ngInject';

  const lastCompletedUserAssessmentGroup = function () {
    return UserAssessmentGroup.query().then(function (groups) {
      if (!_.isEmpty(groups)) {
        return groups.filter(function (group) {
          return group.completed === true;
        })[0];
      }
    });
  };

  const lastUserAssessmentGroup = function () {
    return UserAssessmentGroup.query().then(function (groups) {
      if (!_.isEmpty(groups)) {
        return groups[0];
      };
    });
  };

  const getNextAssessment = function (assessmentGroup) {
    return _.find(assessmentGroup.userAssessments, function (userAssessment) {
      return !userAssessment.completed;
    });
  };

  const updateCompletedUserAssessment = function (userAssessment) {
    userAssessment.completed = true;
    userAssessment.update().then(function () {
      // reload user to get current engagement level
      $loadCurrentUser($rootScope.$currentUser);
    });
  };

  const getQuestionnaires = function (assessmentGroup) {
    return _.filter(assessmentGroup.userAssessments, function (userAssessment) {
      return userAssessment.type === 'AssessmentQuestionnaire';
    });
  };

  const getMBS = function (assessmentGroup) {
    return _.find(assessmentGroup.userAssessments, function (userAssessment) {
      return userAssessment.type === 'AssessmentMBS';
    });
  };

  const getAssessmentScores = function (assessment, pillarName) {
    return _.chain(assessment.assessmentQuestions)
      .filter(question => question.answerValues.length > 0)
      .filter(question => question.pillarName === pillarName)
      .map(question => [question.id, question.answerValues])
      .zipObject()
      .value();
  };

  const saveUserResponse = function (questionId, response, userAssessmentId) {
    return new AssessmentResponse({
      assessmentQuestionId: questionId,
      response: response,
      userAssessmentId: userAssessmentId,
    }).create();
  };

  // TODO: Currently we are storing date as a string. Might reconsider
  // how to process dates if we add assessment reporting later on.
  const saveTextResponses = function (textResponses, userAssessmentId) {
    return $q.all(_.map(textResponses, (response, questionId) => {
      AssessmentResponse.query({
        userAssessmentId: userAssessmentId,
        assessmentQuestionId: questionId,
      }).then((res) => {
        if (!_.isEmpty(res)) {
          return res[0];
        } else {
          return saveUserResponse(questionId, response, userAssessmentId);
        }
      });
    }));
  };

  const saveIndexResponses = function (indexResponses,
                                       assessmentScores,
                                       userAssessmentId) {
    return $q.all(_.map(indexResponses, (_response, questionId) => {
      const response =
        getResponseScore(indexResponses, assessmentScores, questionId);

      AssessmentResponse.query({
        userAssessmentId: userAssessmentId,
        assessmentQuestionId: questionId,
      }).then((res) => {
        if (!_.isEmpty(res)) {
          return res[0];
        } else {
          return saveUserResponse(questionId, response, userAssessmentId);
        }
      });
    }));
  };

  // finds the score for a particular response
  // indexResponses = { questionId: index }
  // scores = { questionId: [score0, score1,...]}
  // if a response has index of 1, getResponseScore() returns score1
  const getResponseScore = function (indexResponses,
                                     scores,
                                     questionId) {
    const index = indexResponses[questionId];
    if (scores[questionId]) {
      return scores[questionId][index];
    } else {
      Airbrake.client.notify(new Error('missing score'));
    }
  };

  const submitAssessmentRedirect = function (group, userAssessmentId) {
    let redirect;
    const secondQuestionnaire = getQuestionnaires(group)[1];
    const firstQuestionnaire = getQuestionnaires(group)[0];

    if (firstQuestionnaire.id === Number(userAssessmentId)) {
      redirect = function () {
        $state.go('application.assessments-questionnaire',
          { id: secondQuestionnaire.id }
        );

      };
    } else if (secondQuestionnaire.id  === Number(userAssessmentId)) {
      redirect = function () {
        $state.go('application.assessment-results.overall');
      };
    } else {
      redirect = function () {};
    }
    return redirect;
  };

  const enqueueResultsUpdate = function (userAssessment) {
    return $assessmentResults.enqueueForRetrieval(userAssessment);
  };

  const hasCompletedAssessments = function () {
    return UserAssessmentGroup.query().then((groups) => {
      return _.filter(groups, function (group) {
        return group.completed;
      }).length > 0;
    });
  };

  const setSubmitButtonText = function (lastGroup) {
    const questionnaires =  getQuestionnaires(lastGroup);
    if (!questionnaires[0].completed) {
      return 'Continue';
    } else {
      return 'Get Your Results';
    }
  };

  return {
    enqueueResultsUpdate: enqueueResultsUpdate,
    lastCompletedUserAssessmentGroup: lastCompletedUserAssessmentGroup,
    lastUserAssessmentGroup: lastUserAssessmentGroup,
    getNextAssessment: getNextAssessment,
    updateCompletedUserAssessment: updateCompletedUserAssessment,
    getQuestionnaires: getQuestionnaires,
    getMBS: getMBS,
    getAssessmentScores: getAssessmentScores,
    saveTextResponses: saveTextResponses,
    saveIndexResponses: saveIndexResponses,
    saveUserResponse: saveUserResponse,
    getResponseScore: getResponseScore,
    submitAssessmentRedirect: submitAssessmentRedirect,
    hasCompletedAssessments: hasCompletedAssessments,
    setSubmitButtonText: setSubmitButtonText,
  };
};

export default AssessmentStatus;
