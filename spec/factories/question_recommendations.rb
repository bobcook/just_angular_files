FactoryGirl.define do
  factory :question_recommendation do
    assessment_question
    association :recommendable, factory: :recipe
  end
end
