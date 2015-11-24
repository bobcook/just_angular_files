const UserAssessmentGroup = function (API_URL, railsResourceFactory) {
  'ngInject';

  const url = `${API_URL}/api/v1/me/assessment_groups`;

  const UserAssessmentGroup = railsResourceFactory({
    name: 'assessmentGroup',
    url: `${url}/{{id}}`,
  });

  return UserAssessmentGroup;
};

export default UserAssessmentGroup;
