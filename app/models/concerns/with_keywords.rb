# TODO: Replace if we need to search by keywords at the DB level
module WithKeywords
  def keywords
    @keywords ||=
      ImportContent::Parse::DelimitedString.from(payload['keywords'])
  end
end
