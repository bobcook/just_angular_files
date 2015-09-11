ActivityUtils = ->
  @displayablePillarNames = (activity, separator)->
    _.pluck(activity.pillars, 'name').join(separator)

  @

angular.module('stayingSharp.userActivities')
  .service('ActivityUtils', ActivityUtils)
