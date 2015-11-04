class AssessmentQuestion < ActiveRecord::Base
  has_many :assessment_responses
  belongs_to :assessment
end
