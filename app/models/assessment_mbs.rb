class AssessmentMBS < Assessment
  def parse_results(raw_results)
    Apis::MBS::AssessmentResults.new(raw_results)
  end

  def parse_session_id(external_session_id)
    external_session_id.split('-').last if external_session_id
  end
end
