const AsssessmentController = function ($stateParams,
                                        $state,
                                        $rootScope,
                                        $featureDetection,
                                        $q,
                                        $scope,
                                        Assessment,
                                        UserAssessment,
                                        AssessmentStatus,
                                        AssessmentResponse,
                                        restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterUnpaidUsers(
    'assessment',
    $state.href('application.assessments')
  );

  const userAssessmentId = $stateParams.id;
  let assessmentRedirect;
  const currentUserAssessment = UserAssessment.get(userAssessmentId);

  // text responses for questions without scores
  this.textResponses = {};
  // index of each response for questions with scores
  this.indexResponses = {};
  // all the possible scores for questions with scores
  this.showAssessment = false;
  this.hasFlash = $featureDetection.hasFlash();
  this.activeForm = {};

  this.tabData = [
    {
      title: 'Tell us about your physical activity:',
      pillar: 'move',
      nextPillar: 'discover',
    },
    {
      title: 'Tell us about how you feed your curiosity:',
      pillar: 'discover',
      nextPillar: 'relax',
    },
    {
      title: 'Tell us about how you relax and sleep:',
      pillar: 'relax',
      nextPillar: 'nourish',
    },
    {
      title: 'Tell us about the foods you eat:',
      pillar: 'nourish',
      nextPillar: 'connect',
    },
    {
      title: 'Tell us about the important people in your life:',
      pillar: 'connect',
    },
  ];

  const getPillar = (pillarName) => {
    return this.tabData.find((tab) => {
      if (tab.pillar === pillarName) {
        return tab;
      }
    });
  };

  const getActivePillar = () => {
    const pillarName = $stateParams.pillarName;
    const tab = getPillar(pillarName);
    if (tab) {
      return tab;
    } else {
      return this.tabData[0];
    }
  };

  this.setActivePillar = function setActivePillar(pillarName = 'move') {
    this.activePillar = getPillar(pillarName);
  }.bind(this);

  this.isActive = (pillarName) => {
    if (pillarName === this.activePillar.pillar) {
      return 'active';
    };
  };

  this.defaultBirthdate = new Date('1955-01-01T00:00:00');

  const getQuestionnaireQuestions = () => {
    currentUserAssessment.then((userAssessment) => {
      if (!userAssessment.id || userAssessment.completed) { return; }

      Assessment.get(userAssessment.assessmentId).then((assessment) => {
        if (assessment.type === 'AssessmentQuestionnaire') {
          this.showAssessment = true;
          this.questionsByPillarName =
            _.groupBy(assessment.assessmentQuestions, 'pillarName');
        }
      });
    });
  };

  const scrollToInvalid = () => {
    const elInvalid = $('form').find('.ng-invalid');
    const headerHeight = $('.global-header').height() + 40;
    if (elInvalid.length) {
      $('html, body').animate({
        scrollTop: $(angular.element(elInvalid[0])).offset().top - headerHeight,
      }, 'slow');
    }
  };

  const currentQuestionIds = (assessment) => {
    return assessment.assessmentQuestions.filter((q) => {
      return q.pillarName === this.activePillar.pillar;
    }).map((q) => { return q.id; });
  };

  const responsesForQuestionIds = (responses, questionIds) => {
    return _.pick(responses, (v, k) => _.includes(questionIds, Number(k)));
  };

  this.collectIndexResponses = (userAssessment) => {
    return Assessment.get(userAssessment.assessmentId).then((assessment) => {
      const scores = (assessment.type === 'AssessmentQuestionnaire')
                   ? AssessmentStatus.getAssessmentScores(
                      assessment,
                      this.activePillar.pillar
                    ) : {};

      return AssessmentStatus.saveIndexResponses(
        responsesForQuestionIds(
          this.indexResponses,
          currentQuestionIds(assessment)
        ),
        scores,
        userAssessmentId
      );
    });
  };

  this.isLastPage = () => {
    return this.activePillar === 'connect';
  };

  const goToNextPillar = () => {
    const id = $stateParams.id;
    const nextPillar = this.activePillar.nextPillar;
    if (nextPillar) {
      $state.go(
        'application.assessments-questionnaire',
        { id: id, pillarName: nextPillar }
      );
    } else {
      goToAssessments();
    }
  };

  const isPaidUser = () => {
    return $rootScope.$currentUser.membershipStatus === 'paid';
  };

  const goToAssessments = () => {
    if (isPaidUser()) {
      $state.go('application.assessment-results.overall');
    } else {
      $state.go('application.assessment-completion');
    }
  };

  this.isLastPillar = () => {
    return !(!!this.activePillar.nextPillar);
  };

  this.getActivePillar = () => {
    return this.tabData.find((tab) => {
      if (tab.pillar === this.activePillar.pillar) {
        return tab;
      }
    });
  };

  const textResponsesPromise = (userAssessment) => {
    Assessment.get(userAssessment.assessmentId).then((assessment) => {
      AssessmentStatus.saveTextResponses(
        responsesForQuestionIds(
          this.textResponses, currentQuestionIds(assessment)
        ),
        userAssessmentId
      );
    });
  };

  const markAsCompleteIfLast = (userAssessment) => {
    if (this.isLastPillar()) {
      AssessmentStatus.updateCompletedUserAssessment(userAssessment);
    }
  };

  this.validateForm = (form) => {
    if (form.$valid) {
      currentUserAssessment.then((userAssessment) => {
        return $q.all([
          markAsCompleteIfLast(userAssessment),
          textResponsesPromise(userAssessment),
          this.collectIndexResponses(userAssessment),
        ]);
      }).then(
        goToNextPillar()
      );
    } else {
      scrollToInvalid();
    }
  };

  if (this.hasFlash) {
    this.activePillar = getActivePillar();

    AssessmentStatus.lastUserAssessmentGroup().then((lastGroup) => {
      if (!lastGroup) { return; };

      getQuestionnaireQuestions();
      this.submitButtonText = AssessmentStatus.setSubmitButtonText(lastGroup);
    });
  }
};

export default AsssessmentController;
