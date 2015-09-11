ActivityTrackerResponse = (railsResourceFactory) ->
  railsResourceFactory
    url: '/api/v1/me/activity_tracker_responses'
    name: 'activityTrackerResponse'

angular.module('stayingSharp.userActivities')
  .factory('ActivityTrackerResponse', ActivityTrackerResponse)
