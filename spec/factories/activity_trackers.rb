FactoryGirl.define do
  factory :activity_tracker do
    trait :binary do
      name 'binary'

      activity_tracker_questions do
        build_list(:activity_tracker_question, 1)
      end
    end

    trait :quantity do
      name 'quantity'

      activity_tracker_questions do
        build_list(:activity_tracker_question, 2)
      end
    end

    trait :scale do
      name 'scale'

      activity_tracker_questions do
        build_list(:activity_tracker_question, 1)
      end
    end
  end
end
