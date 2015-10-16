FactoryGirl.define do
  factory :recipe do
    transient do
      pillar_count 2
    end

    sequence(:title) { |n| "Recipe #{n}" }
    last_modified { Time.current }
    published_at { Time.current }
    prep_time '5 mins.'
    sequence(:payload) do |n|
      example_instructions = [
        'Start Grill',
        'Cook hot dogs',
        'Put hot dog on bun',
        'Drown in Ketchup and Mustard',
        'Enjoy'
      ]
      example_ingredients = [
        'Hot Dogs',
        'Buns',
        'Ketchup',
        'Mustard'
      ]

      instructions =
        example_instructions.sample(rand(2..example_instructions.size))
      instructions_inner_text = instructions.reduce('') do |text, val|
        text + "<li>#{val}</li>"
      end
      instructions_text = "<ol>#{instructions_inner_text}</ol>"

      ingredients =
        example_ingredients.sample(rand(2..example_ingredients.size))
      ingredients_text = ingredients.reduce('') do |text, val|
        text + "<p>#{val}</p>"
      end

      {
        type: 'recipe',
        mastheadTitle: "Test Recipe Hot Dogs #{n}",
        brainHealthPillar: 'Eating Right',
        mastheadImage: 'http://www.suncanihvar.com/sites/default/files/' \
                       'styles/tuesday_caroussel_full/public/featured-blog/' \
                       'autumn_apple_pie_banner.jpg?itok=jWjTYf3X',
        cardImage: 'https://d2izl3afq8akgg.cloudfront.net/' \
                   'wp-content/uploads/2013/12/Blueberries-008.jpg',
        contentSourceBranding: '<p>This is supposed to limit to 40 ' \
                               "characters. Don't think this is happening." \
                               "</p>\n<p></p>\n",
        prepTime: '10 min.',
        description: 'Making hot dogs takes no time at all',
        benefitToBrainHealth:
          "<p>This is acting like a required field?</p>\n<p></p>\n",
        ingredients: ingredients_text,
        'prep/cookingInstructions' => instructions_text,
        cardTitle: "Cooking Hot Dogs #{n}",
        body: '<p>Cooking hot dogs is easy and fun for all.&nbsp;' \
              "</p>\n<p></p>\n",
        impact: '1',
        validity: '2',
        fun: '4',
        difficulty: '5',
        neurotest: [
          'Cognitive Flexibility',
          'Executive Function'
        ],
        activityName: 'Play Tennis',
        trial: 'Yes',
        seoTitle: 'SEO Title',
        seoDescription: 'SEO Description',
        keywords: 'brain food, hot dogs, meat, grilling, healthy eating'
      }
    end

    after(:create) do |recipe, evaluator|
      unless recipe.pillars.present?
        pillars = Pillar.default_types.map do |slug|
          Pillar.find_by(slug: slug) || build("#{slug}_pillar")
        end
        recipe.update(pillars: pillars.sample(evaluator.pillar_count))
      end
    end
  end
end
