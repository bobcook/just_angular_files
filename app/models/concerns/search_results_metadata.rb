module SearchResultsMetadata
  def search_result_resource_type
    self.class.name.downcase
  end

  def search_result_type_label
    self.class.name
  end
end
