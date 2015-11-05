const ActivityReview = function ($stateParams, API_URL, railsResourceFactory) {
  'ngInject';

  const ActivityReview = railsResourceFactory({
    name: 'review',
    url: `${API_URL}/api/v1/activities/{{activityId}}/reviews`,
  });

  // "Class-level" properties
  ActivityReview.extend({
    contentName: 'Review',
  });

  // "Instance-level" properties
  ActivityReview.include({
    contentName: 'Review',
  });

  return ActivityReview;
};

export default ActivityReview;
