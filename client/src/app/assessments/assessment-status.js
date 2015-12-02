const AssessmentStatus = function ($assessmentsAuth,
                                   $state,
                                   $assessmentResults,
                                   UserAssessmentGroup,
                                   AssessmentResponse) {
  'ngInject';

  const lastUserAssessmentGroup = function () {
    return UserAssessmentGroup.query().then(function (groups) {
      return groups[groups.length - 1];
    });
  };

  const updateLastMBS = function (userAssessmentGroup, assessmentId) {
    delete userAssessmentGroup.userAssessments;
    delete userAssessmentGroup.completed;
    userAssessmentGroup.lastMbs = assessmentId;
    userAssessmentGroup.update();
  };

  const getNextAssessment = function (assessmentGroup) {
    return assessmentGroup.userAssessments.find(function (userAssessment) {
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
    return assessmentGroup.userAssessments.filter(function (userAssessment) {
      return userAssessment.type === 'AssessmentQuestionnaire';
    });
  };

  const getMBS = function (assessmentGroup) {
    return assessmentGroup.userAssessments.find(function (userAssessment) {
      return userAssessment.type === 'AssessmentMBS';
    });
  };

  const getAssessmentScores = function (assessment) {
    const scores = {};
    assessment.assessmentQuestions.forEach(function (question) {
      if (question.answerValues.length > 0) {
        scores[question.id] = question.answerValues;
      }
    });
    return scores;
  };

  const saveUserResponse = function (questionId, response, userAssessmentId) {
    new AssessmentResponse({
      assessmentQuestionId: questionId,
      response: response,
      userAssessmentId: userAssessmentId,
    })
    .create();
  };

  // TODO: Currently we are storing date as a string. Might reconsider
  // how to process dates if we add assessment reporting later on.
  const saveTextResponses = function (textResponses, userAssessmentId) {
    for (const questionId in textResponses) {
      const response = textResponses[questionId];
      saveUserResponse(questionId, response, userAssessmentId);
    }
  };

  const saveIndexResponses = function (indexResponses,
                                       assessmentScores,
                                       userAssessmentId) {
    for (const questionId in indexResponses) {
      const response =
        getResponseScore(indexResponses, assessmentScores, questionId);
      saveUserResponse(questionId, response, userAssessmentId);
    }
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
        $state.go('application.assessments-results');
      };
    } else {
      redirect = function () {};
    }
    return redirect;
  };

  const enqueueResultsUpdate = function (userAssessment) {
    return $assessmentResults.enqueueForRetrieval(userAssessment);
  };

  return {
    enqueueResultsUpdate: enqueueResultsUpdate,
    lastUserAssessmentGroup: lastUserAssessmentGroup,
    updateLastMBS: updateLastMBS,
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
  };
};

export default AssessmentStatus;
