# TODO: get rid of this file once we have angular routing in place
ProcessUrl =  ->
  @url = window.location

  # url = 'http://example.com/book/1'
  # resource = 'book'
  # getPathValue('book') returns '1'
  @getPathValue = (resource) ->
    parts = @url.pathname.split('/')
    index = parts.indexOf(resource)
    parts[index + 1]

  # url = 'http://example.com/book/1&author=Me'
  # query = 'author'
  # getQueryStringValue('author') returns 'Me'
  @getQueryStringValue = (query) ->
    queryString = @url.search
    re = new RegExp(query + '=(.*?)(&.*?)*$')
    re.exec(queryString)[1]

  @

angular.module('stayingSharp.userActivities')
  .service('ProcessUrl', ProcessUrl)
