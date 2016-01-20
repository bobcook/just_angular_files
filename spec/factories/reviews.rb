FactoryGirl.define do
  factory :review do
    user
    association :reviewable, factory: :article
    recommend true
  end
end
