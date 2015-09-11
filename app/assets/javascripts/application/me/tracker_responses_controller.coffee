# TODO: remove this file once we move to all Angular
TrackerResponsesController = (railsResourceFactory, ActivityTrackerResponse,
  ActivityTracker) ->

  @data = {}

  @setValue = (key, value) ->
    @data[key] = value

  @error = false
  @errorMessage = null

  @createTrackerResponse = (userActivityId) ->
    trackerResponse = new ActivityTrackerResponse(
      @data
    )
    # TODO: close modal if the request is valid
    # TODO: add form validation
    trackerResponse.create()
      .then((results) =>
        console.log(results)
        @error = false
      )
      .catch( (err) =>
        console.log(err)
        @error = true
        @errorMessage = err.data.errors
      )

  @

angular.module('stayingSharp.userActivities')
  .controller('TrackerResponsesController', TrackerResponsesController)

