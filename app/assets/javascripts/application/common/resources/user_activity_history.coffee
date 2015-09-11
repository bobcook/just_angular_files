UserActivityHistory = (railsResourceFactory) ->
  railsResourceFactory
    url: '/api/v1/me/user_activity_histories'
    name: 'userActivityHistory'

angular.module('stayingSharp.userActivities')
  .factory('UserActivityHistory', UserActivityHistory)
