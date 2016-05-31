class VideoArticle < Article
  include SearchResultsMetadata

  def search_result_resource_type
    'article'
  end

  def search_result_type_label
    'Video Article'
  end
end
