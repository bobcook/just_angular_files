FactoryGirl.define do
  factory :article do
    transient do
      pillar_count 2
    end

    last_modified { Time.current }
    published_at { Time.current }
    sequence(:title) { |n| "Article #{n}" }
    sequence(:payload) do |n|
      {
        mastHeadTitle: '4 Steps to Reduce Age-Related Anxiety',
        mastHeadImage: 'http://www.aarp.org/content/dam/' \
                       'specialized-membership/staying-sharp/articles/' \
                       'info-2015/masthead.jpg',
        'effort/readtime' => 'Read Time: 5 min',
        contentSourceBranding: 'An Article from our partner: ' \
                               'content/dam/specialized-membership/' \
                               'staying-sharp/articles/info-2015/jh-logo.jpg',
        sourceMaterialsCitation: 'Want to dig a little deeper on this topic?',
        description: 'The older we get, the more we worry – and the less ' \
                     'likely we are to try new experiences.',
        section1Body: "<p>A paragraph #{n}</p>",
        section2Body: '',
        bodyImage: '',
        cardImage: 'http://www.aarp.org/content/dam/specialized-membership' \
                   '/staying-sharp/articles/info-2015/card-image.jpg',
        brainHealthPillar: ['Managing Stress'],
        impact: '1',
        validity: '1',
        fun: '2',
        difficulty: '3',
        neurotest: ['Processing Speed', 'Working Memory', 'Executive Function'],
        keywords: 'anxiety, stress reduction',
        seoTitle: '4 Steps to Reduce Age-Related Anxiety ',
        seoDescription: 'While a certain amount of stress can increase ' \
                        'productivity and creativity, too much can be ' \
                        'mentally and physically damaging. Not only does ' \
                        'stress provoke negative behaviors such as bingeing ' \
                        'on junk food, smoking'
      }
    end

    after(:create) do |article, evaluator|
      unless evaluator.pillars.present?
        pillars = Pillar.default_types.map do |slug|
          Pillar.find_by(slug: slug) || build("#{slug}_pillar")
        end
        article.update(pillars: pillars.sample(evaluator.pillar_count))
      end
    end

    Article.article_types.each do |article_type|
      underscored_name = "#{article_type}_article"
      klass = underscored_name.camelize.constantize

      factory underscored_name, class: klass
    end
  end
end
