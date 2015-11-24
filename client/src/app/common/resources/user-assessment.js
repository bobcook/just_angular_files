const UserAssessment = function (API_URL, railsResourceFactory) {
  'ngInject';

  const url = `${API_URL}/api/v1/me/assessments`;

  const UserAssessment = railsResourceFactory({
    name: 'userAssessment',
    url: `${url}/{{id}}`,
  });

  return UserAssessment;
};

export default UserAssessment;
