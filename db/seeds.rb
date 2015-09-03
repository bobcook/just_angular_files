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

activity_tracker_data =
  ActivityTracker.default_types.map { |t| { name: t } }

puts 'Seeding ActivityTrackers'
ActivityTracker.create(activity_tracker_data)

puts 'Seeding Activities'
20.times do |index|
  title = "Lorem ipsum dolor #{index + 1}"
  time = Random.rand(20) + 10
  frequency = Random.rand(8)
  points = Random.rand(90) + 10
  Activity.create(
    title: title,
    recommended_effort_time: "#{time} minutes",
    recommended_effort_frequency: "#{frequency} x weekly",
    activity_tracker_id: Random.rand(ActivityTracker.count) + 1,
    points: points,
    payload: {
      description: '<h2>Introduction</h2><p>Lorem ipsum dolor sit amet,
      consectetur adipis icing elit. Id praesentium suscipit est tempora!
      Doloremque numquam quos laudantium soluta</p><h2>Benefits to Brain
      Health</h2>libero architecto molestias nostrum laboriosam hic
      quis, aperiam natus omnis enim voluptatibus?</p>',
      how_to: '<ul><li>Libero architecto molestias nostrum laboriosam hic</li>
      <li>Aperiam natus omnis enim voluptatibus</li></ul>',
      recommended_effort_time: "#{time} minutes",
      recommended_effort_frequency: "#{frequency} x weekly",
      points: points
    }
  )
end

puts 'Seeding PillarCategorization'
pillars = Pillar.all
count = pillars.count

Activity.all.each do |activity|
  shuffled_pillars = pillars.shuffle
  (Random.rand(count) + 1).times do |index|
    pillar = shuffled_pillars[index]
    PillarCategorization.create(pillar: pillar, categorizable: activity)
  end
end
