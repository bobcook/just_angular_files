const UserInfo = function (API_URL, railsResourceFactory) {
  'ngInject';

  const UserInfo = railsResourceFactory({
    name: 'user_info',
    url: `${API_URL}/api/v1/me/assessment_results/` +
         `{{userAssessmentGroupId}}/user_info`,
  });

  return UserInfo;
};

export default UserInfo;
