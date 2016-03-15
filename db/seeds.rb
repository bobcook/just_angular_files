require_relative './seed_data/assessment_questions'

pillar_data = [
  {
    name: 'Keeping Fit',
    display_name: 'MOVE',
    description: 'Move your body to engage your mind.',
    slug: 'keeping_fit'
  },
  {
    name: 'Learning More',
    display_name: 'DISCOVER',
    description: 'Challenge your brain through continuous learning.',
    slug: 'learning_more'
  },
  {
    name: 'Managing Stress',
    display_name: 'RELAX',
    description: 'Keep stress levels down to allow your brain to relax ' \
                 'and recharge.',
    slug: 'managing_stress'
  },
  {
    name: 'Eating Right',
    display_name: 'NOURISH',
    description: 'Feed your brain the foods and nutrients it needs to ' \
                 'function best.',
    slug: 'eating_right'
  },
  {
    name: 'Being Social',
    display_name: 'CONNECT',
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

assessments = [
  { name: 'MBS', order: 1, type: 'AssessmentMBS' },
  { name: 'Questionnaire', order: 2, type: 'AssessmentQuestionnaire' }
]

puts 'Seeding Assessments'
Assessment.create(assessments)

puts 'Seeding Assessment Questions'
AssessmentQuestion.create(SeedData::AssessmentQuestions.seed)
