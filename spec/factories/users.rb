FactoryGirl.define do
  factory :user do
    first_name 'FIRST'
    last_name 'LAST'
    sequence(:email) { |n| "user#{n}@example.com" }
    sequence(:external_id) { |n| "016c4e57b117462a992de1f53de8c09#{n}" }
    password 'password'
    membership_status :prospect
  end
end
