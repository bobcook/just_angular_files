class Assessment < ActiveRecord::Base
  has_many :assessment_questions
  has_many :user_assessments

  # Override in subclasses if needed
  def parse_results(raw_results)
    raw_results
  end

  # Override in subclasses if neeeded
  def parse_session_id(external_session_id)
    external_session_id
  end
end
