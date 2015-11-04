const AsssessmentController = function ($state,
                                        $stateParams,
                                        $location,
                                        Assessment,
                                        MbsRoutes) {
  'ngInject';

  // TODO: refactor by having MBS send the id as query params to another route
  const CALIBRATION_ID = '11';
  const PROCESSING_SPEED_ID = '74';
  const RECALL_MEMORY_ID = '75';
  const SUSTAINED_ATTENTION_ID = '79';
  const WORKING_MEMORY_ID = '27';
  const COGNITIVE_FLEXIBILITY_ID = '57';
  const EXECUTIVE_FUNCTION_ID = '66';
  const RECALL_MEMORY_DELAYED_ID = '76';
  const LAST_MBS_ASSESSMENT_ID = RECALL_MEMORY_DELAYED_ID;
  const LAST_QUESTIONNAIRE_ID = '3';

  const ASSESSMENTS = {
    [CALIBRATION_ID] : {
      nextAssessmentId: PROCESSING_SPEED_ID,
      slug: 'processing-speed',
    },
    [PROCESSING_SPEED_ID]: {
      nextAssessmentId: RECALL_MEMORY_ID,
      slug: 'recall-memory',
    },
    [RECALL_MEMORY_ID] : {
      nextAssessmentId: SUSTAINED_ATTENTION_ID,
      slug: 'sustained-attention',
    },
    [SUSTAINED_ATTENTION_ID] : {
      nextAssessmentId: WORKING_MEMORY_ID,
      slug: 'working-memory',
    },
    [WORKING_MEMORY_ID] : {
      nextAssessmentId: COGNITIVE_FLEXIBILITY_ID,
      slug: 'cognitive-flexibility',
    },
    [COGNITIVE_FLEXIBILITY_ID] : {
      nextAssessmentId: EXECUTIVE_FUNCTION_ID,
      slug: 'executive-function',
    },
    [EXECUTIVE_FUNCTION_ID] : {
      nextAssessmentId: RECALL_MEMORY_DELAYED_ID,
      slug: 'recall-memory-delayed',
    },
    [RECALL_MEMORY_DELAYED_ID] : { nextAssessmentId: null },
  };
  const assessmentId = $location.url().split('/assessment/')[1];

  const assessment = ASSESSMENTS[assessmentId];

  if (assessmentId === LAST_MBS_ASSESSMENT_ID) {
    $state.go(
      'application.assessments-questionnaire', { id: LAST_QUESTIONNAIRE_ID }
    );
  } else if (assessment) {
    $state.go(`application.assessments-mbs.${assessment.slug}`);
  }

  this.mbsUrl = MbsRoutes.TAKE_ASSESSMENTS;

  this.showResultsLink = assessmentId === LAST_QUESTIONNAIRE_ID;

  Assessment.get($stateParams.id).then((assessment) => {
    if (assessment.type === 'AssessmentQuestionnaire') {
      this.questions = assessment.assessmentQuestions;
    }
  });

};

export default AsssessmentController;
