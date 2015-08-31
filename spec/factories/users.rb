FactoryGirl.define do
  factory :user do
    first_name 'FIRST'
    last_name 'LAST'
    sequence(:email) { |n| "user#{n}@example.com" }
    password 'password'
  end
end
