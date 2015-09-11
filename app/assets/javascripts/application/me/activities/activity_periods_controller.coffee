ActivityPeriodsController = (railsResourceFactory, activityPeriod) ->
  @createActivityPeriod = (userActivityId) ->
    # TODO: send time zone info
    time = Date.now()
    newActivityPeriod = new activityPeriod(
      { completed_date: time, user_activity_id: userActivityId }
    )
    newActivityPeriod.create()
      .then((results) =>
      )
      .catch( (err) =>
        console.log(err)
      )
    # TODO: error checking if api call fails
    # TODO: set off modal

  @

angular.module('stayingSharp.userActivities')
  .controller('ActivityPeriodsController', ActivityPeriodsController)

