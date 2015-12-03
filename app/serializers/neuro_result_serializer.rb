class NeuroResultSerializer < ActiveModel::Serializer
  attributes(
    *(
      Apis::MBS::AssessmentResults.neuro_category_names +
      [:type, :created_at, :id]
    )
  )

  def type
    'NeuroPerformance'
  end
end
