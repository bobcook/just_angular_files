require 'rails_helper'

describe UserAssessmentGroup do
  it { should belong_to(:user) }
  it { should have_many(:user_assessments) }
  it { should have_one(:mbs_user_assessment) }

  describe '#mbs_user_assessment' do
    it 'is nil if the UserAssessmentGroup is not related to an AssessmentMBS' do
      subject = create(:user_assessment_group)
      assessment = create(:questionnaire_assessment)
      create(
        :user_assessment,
        assessment: assessment,
        user_assessment_group: subject
      )
      subject.reload

      expect(subject.mbs_user_assessment).to be_nil
    end

    it 'has #type of AssessmentMBS' do
      subject = create(:user_assessment_group)
      assessment = create(:mbs_assessment)
      create(
        :user_assessment,
        assessment: assessment,
        user_assessment_group: subject
      )
      subject.reload

      expect(subject.mbs_user_assessment.type).to eq('AssessmentMBS')
    end
  end

  describe 'validations' do
    describe '#has_only_one_mbs_user_assesment' do
      it 'does not have errors when there are no UserAssessments' do
        subject = create(:user_assessment_group)

        expect(subject.errors[:mbs_user_assessment].length).to eq(0)
      end

      it 'does not have errors when there are no related AssessmentMBSs' do
        subject = create(:user_assessment_group)
        assessment = create(:questionnaire_assessment)
        subject.user_assessments << build(
          :user_assessment,
          assessment: assessment,
          user_assessment_group: subject
        )

        expect(subject.valid?).to eq(true)
        expect(subject.errors[:mbs_user_assessment].length).to eq(0)
      end

      it 'does not have errors when there is only 1 AssessmentMBSs' do
        subject = create(:user_assessment_group)
        assessment = create(:mbs_assessment)
        subject.user_assessments << build(
          :user_assessment,
          assessment: assessment,
          user_assessment_group: subject
        )

        expect(subject.valid?).to eq(true)
        expect(subject.errors[:mbs_user_assessment].length).to eq(0)
      end

      it 'has errors when there is > 1 AssessmentMBSs' do
        subject = create(:user_assessment_group)
        first_assessment = create(:mbs_assessment)
        subject.user_assessments << build(
          :user_assessment,
          assessment: first_assessment,
          user_assessment_group: subject
        )
        second_assessment = create(:mbs_assessment)
        subject.user_assessments << build(
          :user_assessment,
          assessment: second_assessment,
          user_assessment_group: subject
        )

        expect(subject.valid?).to eq(false)
        expect(subject.errors[:mbs_user_assessment].length).to eq(1)
      end
    end
  end
end
