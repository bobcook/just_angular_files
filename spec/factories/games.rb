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
        title: "Game #{n}",
        type: 'games',
        description: 'Train your mental calculation and multi-step processing' \
          ' skills by discovering math formulas. The game presents various' \
          ' numbers and four standard mathematical functions: +,-, x, and /.',
        bodyImage: 'http://www.aarp.org/ content/dam/specialized-membership/' \
          'staying-sharp/games/info-2015/gamebody-image.jpg',
        cardImage: 'http://www.aarp.org/content/dam/specialized-membership/' \
          'staying-sharp/games/info-2015/gamecard-image.jpg',
        callToActionUrl: 'http://braingames1.aarp.org/countdown.html',
        contentSourceBranding: '',
        difficultyLevel: 'Medium',
        activityName: '',
        gameType: ['Free'],
        keywords: 'brain games, happy neuron, brain health',
        seoTitle: 'Staying Sharp Brain Games',
        seoDescription: 'Brain Games: Test Your Memory, Attention, Language' \
          ' Skills – Staying Sharp'
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
