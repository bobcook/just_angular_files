FactoryGirl.define do
  factory :assessment do
    factory :mbs_assessment, class: AssessmentMBS do
      name 'MBS'
    end

    factory :questionnaire_assessment, class: AssessmentQuestionnaire do
      sequence(:name) { |n| "Questionnaire #{n}" }
    end
  end
end
