ActivityTracker = (railsResourceFactory) ->
  railsResourceFactory
    url: '/api/v1/me/activity_tracker'
    name: 'activityTracker'

angular.module('stayingSharp.userActivities')
  .factory('ActivityTracker', ActivityTracker)
