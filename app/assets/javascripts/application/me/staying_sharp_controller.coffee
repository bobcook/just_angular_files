ActivitiesController = (UserActivity, ActivityPeriod, ActivityUtils,
  UserActivityHistory) ->

  # TODO: Use ui-router resolve to load resources
  UserActivity.query()
    .then((results) =>
      @userActivities = results.userActivities
    )

  # TODO: pull out date formatting constant into a lookup table
  # or use Angular's date filter
  @currentWeekText = ->
    "#{moment().startOf('week').format('MMM D')} - " +
    "#{moment().endOf('week').format('MMM D')}"

  @displayablePillarNames = (activity, separator) ->
    ActivityUtils.displayablePillarNames(activity, separator)

  # TODO: research whether to pass in id or object
  @createActivityPeriod = (activityId, userActivityId) ->
    # TODO: send time zone info
    # TODO: does angular offer a better way to handle current time?
    time = Date.now()
    newActivityPeriod = new ActivityPeriod(
      { completedDate: time, userActivityId: userActivityId }
    )
    # TODO: error checking if api call fails
    newActivityPeriod.create()
      .then((results) ->
        # TODO: replace redirect with a modal
        window.location.href = activityTrackerResponseUrl(activityId, userActivityId)
      )
      .catch( (err) ->
        console.log(err)
      )

  # TODO: refactor or remove these hard-coded routes
  @settingsUrl = (activityId, userActivityId) ->
    "/me/activities/#{activityId}/reminder_settings/" +
    "edit?user_activity_id=#{userActivityId}"

  @activityUrl = (activityId) ->
    "/activities/#{activityId}"

  activityTrackerResponseUrl = (activityId, userActivityId) ->
    "/me/activities/#{activityId}/tracker_responses/" +
    "new?user_activity_id=#{userActivityId}"

  @

angular.module('stayingSharp.userActivities')
  .controller('ActivitiesController', ActivitiesController)
