FactoryGirl.define do
  factory :activity_tracker_question do
    sequence(:text) { |n| "What is the answer to question #{n}?" }
  end
end
