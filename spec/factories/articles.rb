FactoryGirl.define do
  factory :article do
    transient do
      pillar_count 2
    end

    last_modified { Time.current }
    published_at { Time.current }
    type { "#{Article.article_types.sample}_article".camelize }
    sequence(:title) { |n| "Article #{n}" }
    sequence(:payload) do |n|
      {
        mastheadTitle: '4 Steps to Reduce Age-Related Anxiety',
        mastheadImage: 'http://www.aarp.org/content/dam/' \
                       'specialized-membership/staying-sharp/articles/' \
                       'info-2015/masthead.jpg',
        'effort/readTime' => 'Read Time: 5 min',
        contentSourceBranding: 'An Article from our partner: ' \
                               'content/dam/specialized-membership/' \
                               'staying-sharp/articles/info-2015/jh-logo.jpg',
        sourceMaterialsCitation: '<p>Want to dig a little deeper on this ' \
          'topic?</p> </p>If you want to dig a little deeper, the full study ' \
          'can be found in <a href="http://jama.jamanetwork.com/article.aspx?' \
          'articleid=1814206&resultClick=3">Journal of the American Medical ' \
          'Association</a>',
        description: 'The older we get, the more we worry – and the less ' \
                     'likely we are to try new experiences.',
        section1Body: "<p>A paragraph #{n}</p>" \
          '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>',
        section2Body: '',
        bodyImage: 'http://i.istockimg.com/file_thumbview_approve/23264892/6/' \
          'stock-photo-23264892-elderly-women-gardening.jpg',
        cardImage: 'http://i.istockimg.com/file_thumbview_approve/23264892/6/' \
          'stock-photo-23264892-elderly-women-gardening.jpg',
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

      factory underscored_name, class: klass do
        type underscored_name.camelize
      end
    end
  end
end
