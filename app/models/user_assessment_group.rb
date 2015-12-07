class UserAssessmentGroup < ActiveRecord::Base
  has_many :user_assessments, dependent: :destroy
  has_one :mbs_user_assessment,
          (lambda do
            includes(:assessment).where(assessments: { type: 'AssessmentMBS' })
          end),
          class_name: 'UserAssessment'

  belongs_to :user

  validate :only_one_mbs_user_assesment

  def self.upto_id(id)
    where('user_assessment_groups.id <= :id', id: id)
  end

  # TODO: do in query
  def lifestyle_user_assessments
    user_assessments.reject do |ua|
      ua == mbs_user_assessment
    end
  end

  def completed?
    user_assessments.all?(&:completed?)
  end

  private

  def only_one_mbs_user_assesment
    mbs_user_assessments =
      user_assessments.select { |ua| ua.type == 'AssessmentMBS' }
    msg = 'is already associated to this UserAssessmentGroup'

    errors.add(:mbs_user_assessment, msg) if mbs_user_assessments.length > 1
  end
end
