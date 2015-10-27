FactoryGirl.define do
  factory :game do
    transient do
      pillar_count 2
    end

    last_modified { Time.current }
    published_at { Time.current }
    sequence(:title) { |n| "Game #{n}" }
    sequence(:payload) do |n|
      {
        title: "Game #{n}"
      }
    end

    after(:create) do |game, evaluator|
      unless evaluator.pillars.present?
        pillars = Pillar.default_types.map do |slug|
          Pillar.find_by(slug: slug) || build("#{slug}_pillar")
        end
        game.update(pillars: pillars.sample(evaluator.pillar_count))
      end
    end
  end
end
