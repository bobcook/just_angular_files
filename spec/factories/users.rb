FactoryGirl.define do
  factory :user do
    first_name 'FIRST'
    last_name 'LAST'
    sequence(:email) { |n| "user#{n}@example.com" }
    sequence(:external_id) { |n| "016c4e57b117462a992de1f53de8c09#{n}" }
    password 'password'
    membership_status :prospect
    last_sign_in_at Time.zone.now
    trait :with_user_assessment_group do
      after(:create) do |user|
        create(:user_assessment_group, user_id: user.id)
      end
    end
  end
end
