const AsssessmentsCallbackController = function ($state,
                                        $stateParams,
                                        $location) {
  'ngInject';

  const CALIBRATION_ID = '11';
  const PROCESSING_SPEED_ID = '74';
  const RECALL_MEMORY_ID = '75';
  const SUSTAINED_ATTENTION_ID = '79';
  const WORKING_MEMORY_ID = '27';
  const COGNITIVE_FLEXIBILITY_ID = '57';
  const EXECUTIVE_FUNCTION_ID = '66';
  const RECALL_MEMORY_DELAYED_ID = '76';
  const LAST_MBS_ASSESSMENT_ID = RECALL_MEMORY_DELAYED_ID;
  // TODO: dynamically get last questionnaire id
  const LAST_QUESTIONNAIRE_ID = '3';

  const ASSESSMENTS = {};
  ASSESSMENTS[CALIBRATION_ID] = {
    nextAssessmentId: PROCESSING_SPEED_ID,
    slug: 'processing-speed',
  };
  ASSESSMENTS[PROCESSING_SPEED_ID] = {
    nextAssessmentId: RECALL_MEMORY_ID,
    slug: 'recall-memory',
  };
  ASSESSMENTS[RECALL_MEMORY_ID] = {
    nextAssessmentId: SUSTAINED_ATTENTION_ID,
    slug: 'sustained-attention',
  };
  ASSESSMENTS[SUSTAINED_ATTENTION_ID] = {
    nextAssessmentId: WORKING_MEMORY_ID,
    slug: 'working-memory',
  };
  ASSESSMENTS[WORKING_MEMORY_ID] = {
    nextAssessmentId: COGNITIVE_FLEXIBILITY_ID,
    slug: 'cognitive-flexibility',
  };
  ASSESSMENTS[COGNITIVE_FLEXIBILITY_ID] = {
    nextAssessmentId: EXECUTIVE_FUNCTION_ID,
    slug: 'executive-function',
  };
  ASSESSMENTS[EXECUTIVE_FUNCTION_ID] = {
    nextAssessmentId: RECALL_MEMORY_DELAYED_ID,
    slug: 'recall-memory-delayed',
  };
  ASSESSMENTS[RECALL_MEMORY_DELAYED_ID] = { nextAssessmentId: null };

  const assessmentId = $location.search().id;
  const assessment = ASSESSMENTS[assessmentId];

  if (assessmentId === LAST_MBS_ASSESSMENT_ID) {
    $state.go(
      'application.assessments-questionnaire', { id: LAST_QUESTIONNAIRE_ID }
    );
  } else if (assessment) {
    $state.go(`application.assessments-mbs.${assessment.slug}`);
  }

};

export default AsssessmentsCallbackController;
