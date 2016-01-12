const AssessmentStatus = function ($assessmentsAuth,
                                   $state,
                                   $assessmentResults,
                                   $q,
                                   UserAssessmentGroup,
                                   AssessmentResponse) {
  'ngInject';

  const lastUserAssessmentGroup = function () {
    return UserAssessmentGroup.query().then(function (groups) {
      if (groups) {
        return groups[groups.length - 1];
      }
    });
  };

  const getNextAssessment = function (assessmentGroup) {
    return _.find(assessmentGroup.userAssessments, function (userAssessment) {
      return !userAssessment.completed;
    });
  };

  const updateCompletedUserAssessment = function (userAssessment) {
    delete userAssessment.assessment;
    delete userAssessment.type;
    userAssessment.completed = true;
    userAssessment.update();
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

  const getAssessmentScores = function (assessment) {
    return _.chain(assessment.assessmentQuestions)
      .filter(question => question.answerValues.length > 0)
      .zipObject(question => [scores[question.id], question.answerValues])
      .value();
  };

  const saveUserResponse = function (questionId, response, userAssessmentId) {
    return new AssessmentResponse({
      assessmentQuestionId: questionId,
      response: response,
      userAssessmentId: userAssessmentId,
    })
    .create();
  };

  // TODO: Currently we are storing date as a string. Might reconsider
  // how to process dates if we add assessment reporting later on.
  const saveTextResponses = function (textResponses, userAssessmentId) {
    return $q.all(_.map(textResponses, (questionId) => {
      const response = textResponses[questionId];
      return saveUserResponse(questionId, response, userAssessmentId);
    }));
  };

  const saveIndexResponses = function (indexResponses,
                                       assessmentScores,
                                       userAssessmentId) {
    return $q.all(_.map(indexResponses, (questionId) => {
      const response =
        getResponseScore(indexResponses, assessmentScores, questionId);
      return saveUserResponse(questionId, response, userAssessmentId);
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
    }
  };

  const submitAssessmentRedirect = function (group, userAssessmentId) {
    let redirect;
    const secondQuestionnaire = getQuestionnaires(group)[1];
    const firstQuestionnaire = getQuestionnaires(group)[0];

    if (firstQuestionnaire.id === Number(userAssessmentId)) {
      redirect = function () {
        $assessmentsAuth.authenticate();
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
      return 'Start Neuroperformance Tests';
    } else {
      return 'Get Your Results';
    }
  };

  return {
    enqueueResultsUpdate: enqueueResultsUpdate,
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
