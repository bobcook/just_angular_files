pillar_data = [
  {
    name: 'Keeping Fit',
    description: 'Move your body to engage your mind.',
    slug: 'keeping_fit'
  },
  {
    name: 'Learning More',
    description: 'Challenge your brain through continuous learning.',
    slug: 'learning_more'
  },
  {
    name: 'Managing Stress',
    description: 'Keep stress levels down to allow your brain to relax ' \
                 'and recharge.',
    slug: 'managing_stress'
  },
  {
    name: 'Eating Right',
    description: 'Feed your brain the foods and nutrients it needs to ' \
                 'function best.',
    slug: 'eating_right'
  },
  {
    name: 'Being Social',
    description: 'Social connections help you feel vital and engaged.',
    slug: 'being_social'
  }
]

puts 'Seeding Pillars'
Pillar.create(pillar_data)

activity_tracker_names = ActivityTracker.default_types

puts 'Seeding ActivityTrackers'
activity_tracker_names.each do |name|
  FactoryGirl.create(:activity_tracker, name.to_sym)
end

puts 'Seeding Articles'
FactoryGirl.create_list(
  :article,
  6,
  type: "#{Article.article_types.sample.capitalize}Article",
  pillars: Pillar.all.sample(2)
)

puts 'Seeding Recipes'
FactoryGirl.create_list(:recipe, 4)

puts 'Seeding Activities'
7.times do
  tracker = ActivityTracker.find_by(name: 'binary')
  FactoryGirl.create(:activity, activity_tracker: tracker)
end

puts 'Seeding Games'
FactoryGirl.create_list(:game, 4)

