FactoryGirl.define do
  factory :article do
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
  end
end
