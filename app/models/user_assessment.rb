# Is an "instance" of a User taking a particular Assessment, including
# relationships to all responses through #assessment_responses
class UserAssessment < ActiveRecord::Base
  has_one :user, through: :user_assessment_group
  has_many :assessment_questions, through: :assessment
  has_many :assessment_responses, dependent: :destroy

  belongs_to :assessment
  belongs_to :user_assessment_group

  delegate :type, to: :assessment

  def results
    assessment.parse_results(raw_results)
  end

  def session_id
    assessment.parse_session_id(external_session_id)
  end
end
