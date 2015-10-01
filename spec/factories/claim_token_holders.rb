FactoryGirl.define do
  factory :claim_token_holder do
    sequence(:claim_token) { |id| "CLAIM TOKEN #{id}" }
    sequence(:auth_token) { |id| "AUTH TOKEN #{id}" }
  end
end
