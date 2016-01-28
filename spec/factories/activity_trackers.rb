FactoryGirl.define do
  factory :activity_tracker do
    trait :binary do
      name 'binary'
      cms_name 'Binary'

      activity_tracker_questions do
        build_list(:activity_tracker_question, 1)
      end
    end

    trait :quantity_steps do
      name 'quantity_steps'
      cms_name 'Quantity: Steps'

      activity_tracker_questions do
        build_list(:activity_tracker_question, 1)
      end
    end

    trait :quantity_miles do
      name 'quantity_miles'
      cms_name 'Quantity: Miles'

      activity_tracker_questions do
        build_list(:activity_tracker_question, 1)
      end
    end

    trait :quantity_servings do
      name 'quantity_servings'
      cms_name 'Quantity: Servings'

      activity_tracker_questions do
        build_list(:activity_tracker_question, 1)
      end
    end

    trait :quantity_units do
      name 'quantity_units'
      cms_name 'Quantity: Other'

      activity_tracker_questions do
        build_list(:activity_tracker_question, 1)
      end
    end

    trait :quantity_minutes do
      name 'quantity_minutes'
      cms_name 'Quantity: Time'

      activity_tracker_questions do
        build_list(:activity_tracker_question, 1)
      end
    end

    trait :scale do
      name 'scale'
      cms_name 'Scale'

      activity_tracker_questions do
        build_list(:activity_tracker_question, 1)
      end
    end
  end
end
