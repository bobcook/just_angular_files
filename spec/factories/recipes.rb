FactoryGirl.define do
  factory :recipe do
    sequence(:title) { |n| "Recipe #{n}" }
    prep_time '5 mins.'
    sequence(:payload) do
      example_instructions = [
        'Mix the things',
        'Whip it up real good-like',
        'Add the second ingredient',
        'Add another ingredient',
        'Bake until done',
        'Cut and serve'
      ]
      example_ingredients = [
        '2 eggs',
        '1 cup sugar',
        '1 cup milk',
        '1 tsp salt',
        '2 cups flour',
        '1/2 cup oil'
      ]

      instructions =
        example_instructions.sample(rand(2..example_instructions.size))

      ingredients =
        example_ingredients.sample(rand(2..example_ingredients.size))
      {
        ingredients: ingredients,
        instructions: instructions,
        overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' \
                  'Proin tincidunt, justo in cursus tincidunt, tellus augue ' \
                  'sodales lectus, maximus rutrum nunc enim sit amet quam. ' \
                  'Sed mollis ultricies neque, at bibendum libero imperdiet ' \
                  'at. Vestibulum a felis lacus. Etiam ullamcorper eget ' \
                  'purus id molestie.',
        benefits: 'Praesent in elit urna. Vivamus in sem non leo euismod ' \
                  'tincidunt. Mauris quam arcu, mattis eu felis vel, ' \
                  'vulputate suscipit eros. Fusce commodo arcu cursus ' \
                  'ullamcorper sagittis. Maecenas pharetra quam vel ante ' \
                  'porta, nec volutpat purus porttitor.'
      }
    end
  end
end
