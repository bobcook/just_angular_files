class UserAssessment < ActiveRecord::Base
  has_one :user, through: :user_assessment_group
  has_many :assessment_responses, dependent: :destroy
  belongs_to :assessment
  belongs_to :user_assessment_group
  delegate :type, to: :assessment
end
