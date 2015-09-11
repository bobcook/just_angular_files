UserActivity  = (railsResourceFactory) ->
  railsResourceFactory
    url: '/api/v1/me/user_activities'
    name: 'userActivity'

angular.module('stayingSharp.userActivities')
  .factory('UserActivity', UserActivity)
