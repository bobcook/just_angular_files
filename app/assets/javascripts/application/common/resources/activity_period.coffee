ActivityPeriod = (railsResourceFactory) ->
  railsResourceFactory
    url: '/api/v1/me/user_activity_periods'
    name: 'activityPeriod'

angular.module('stayingSharp.userActivities')
  .factory('ActivityPeriod', ActivityPeriod)
