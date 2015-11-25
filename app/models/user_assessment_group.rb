class UserAssessmentGroup < ActiveRecord::Base
  has_many :user_assessments, dependent: :destroy
  belongs_to :user

  def completed?
    user_assessments.all?(&:completed?)
  end
end
