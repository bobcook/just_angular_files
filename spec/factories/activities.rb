FactoryGirl.define do
  factory :activity do
    transient do
      pillar_count 2
    end

    title 'activity title'
    recommended_effort_time '30 minutes'
    recommended_effort_frequency '1 x weekly'
    points '10 pts'
    activity_tracker # TODO: randomize type?

    sequence(:payload) do |n|
      {
        type: 'activity',
        mastheadTitle: "TEST ACTIVITY Tennis #{n}, " \
                       'Swimming Keep Heart, Mind in the Game and Mix Up',
        description: 'Strokes in pool, on court, challenge body and brain, ' \
                     'potentially improving heart and cognitive function',
        brainHealthPillar: 'Keeping Fit',
        mastheadImage: 'http://buytennisbettingtips.com/wp-content/' \
                       'uploads/2014/07/tennis_banner1.jpg',
        cardImage: 'http://blog.mytennislessons.com/wp-content/uploads/2014/' \
                   '10/photolibrary_rf_photo_of_older_man_playing_tennis.jpg',
        effort: 'Read Time: 5 min.',
        recommendedFrequency: '2 times per week',
        benefitToBrainHealth: "<p>Will make you strong like bull</p>\n",
        howTo: "<p>Swing the racket and hit the ball</p>\n<p></p>\n",
        cardTitle: "Play Tennis #{n}",
        section1Body: '<p>Variety is the spice of life-and also of ' \
                      'exercise routines. The latest research finds that ' \
                      'tennis and swimming can challenge your body, ' \
                      "and your brain, in new ways.</p>\n",
        impact: '5',
        validity: '4',
        fun: '3',
        difficulty: '2',
        neuroTest: [
          'Processing Speed',
          'Executive Function'
        ],
        trackerConnectedApp: 'Yes',
        trackerMaxValue: '2',
        activityType: 'Standard',
        activityTrial: 'Yes',
        activityName: 'Play Tennis',
        seoTitle: 'SEO Title',
        seoDescription: 'SEO Description',
        keywords: 'keyword1, keyword2, keyword 3, discover, tennis, sports'
      }
    end

    after(:create) do |activity, evaluator|
      unless activity.pillars.present?
        pillars = Pillar.default_types.map do |slug|
          Pillar.find_by(slug: slug) || build("#{slug}_pillar")
        end
        activity.update(pillars: pillars.sample(evaluator.pillar_count))
      end
    end
  end
end
