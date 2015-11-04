class AssessmentResponse < ActiveRecord::Base
  belongs_to :user_assessment
  belongs_to :assessment_question
end
