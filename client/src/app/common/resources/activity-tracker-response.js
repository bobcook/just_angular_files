const ActivityTrackerResponse = function (API_URL,
                                          railsResourceFactory,
                                          railsSerializer) {
  'ngInject';

  return railsResourceFactory({
    name: 'activityTrackerResponse',
    url: `${API_URL}/api/v1/me/activity_tracker_responses`,
    serializer: railsSerializer(function () {
      this.exclude('id', 'activityTrackerQuestion');
      this.add('activityTrackerQuestionId', function (response) {
        return response.activityTrackerQuestion.id;
      });
    }),
  });
};

export default ActivityTrackerResponse;
