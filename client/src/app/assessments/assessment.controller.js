const AsssessmentController = function ($state, $stateParams, $location) {
  'ngInject';

  // TODO: refactor by having MBS send the id as query params to another route
  const PROCESSING_SPEED_ID = '74';
  const RECALL_MEMORY_ID = '75';
  const SUSTAINED_ATTENTION_ID = '79';
  const WORKING_MEMORY_ID = '27';
  const COGNITIVE_FLEXIBILITY_ID = '57';
  const EXECUTIVE_FUNCTION_ID = '66';
  const RECALL_MEMORY_DELAYED_ID = '76';
  const LAST_ASSESSMENT_ID = RECALL_MEMORY_DELAYED_ID;
  const CALIBRATION_ID = '11';

  const ASSESSMENTS = {
    calibration : {
      nextAssessmentId: PROCESSING_SPEED_ID,
      slug: 'processing-speed',
    },
    ['id'+PROCESSING_SPEED_ID ]: {
      nextAssessmentId: RECALL_MEMORY_ID,
      slug: 'recall-memory',
    },
    ['id'+RECALL_MEMORY_ID] : {
      nextAssessmentId: SUSTAINED_ATTENTION_ID,
      slug: 'sustained-attention',
    },
    ['id'+SUSTAINED_ATTENTION_ID] : {
      nextAssessmentId: WORKING_MEMORY_ID,
      slug: 'working-memory',
    },
    ['id'+WORKING_MEMORY_ID] : {
      nextAssessmentId: COGNITIVE_FLEXIBILITY_ID,
      slug: 'cognitive-flexibility',
    },
    ['id'+COGNITIVE_FLEXIBILITY_ID] : {
      nextAssessmentId: EXECUTIVE_FUNCTION_ID,
      slug: 'executive-function',
    },
    ['id'+EXECUTIVE_FUNCTION_ID] : {
      nextAssessmentId: RECALL_MEMORY_DELAYED_ID,
      slug: 'recall-memory-delayed',
    },
    ['id'+RECALL_MEMORY_DELAYED_ID] : { nextAssessmentId: null },
  };

  const assessmentId = $location.url().split('/assessment/')[1];

  if( assessmentId === CALIBRATION_ID) {
    $state.go('application.assessment.' + ASSESSMENTS['calibration'].slug);
  } else if( assessmentId === LAST_ASSESSMENT_ID) {
    $state.go('application.assessments-results');
  } else if(typeof Number(assessmentId) == 'number') {
    $state.go('application.assessment.' + ASSESSMENTS['id' + Number(assessmentId)].slug);
  }

  this.mbsUrl = 'https://stage.mybrainsolutions.com/MyBrain/'+
    'MyBrainAssessment.aspx?start=true';
};

export default AsssessmentController;
