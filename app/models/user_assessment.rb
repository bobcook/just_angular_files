class UserAssessment < ActiveRecord::Base
  belongs_to :user
  has_many :assessment_responses
  belongs_to :assessment
end
