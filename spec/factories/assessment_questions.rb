FactoryGirl.define do
  factory :assessment_question do
    transient do
      create_recommendation false
    end

    sequence(:external_recommendation_id) { |n| "0010#{n}" }
    # TODO: add other associations
    sequence(:order, &:to_s)

    trait :with_recommendation do
      transient do
        create_recommendation true
      end
    end

    after(:create) do |question, evaluator|
      create(
        :question_recommendation,
        assessment_question: question,
        external_id: question.external_recommendation_id
      ) if evaluator.create_recommendation
    end
  end
end
