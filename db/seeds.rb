require_relative './seed_data/assessment_questions'

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

assessments = [
  { name: 'Questionnaire 1', order: 1, id: 1, type: 'AssessmentQuestionnaire' },
  { name: 'MBS', order: 2, id: 2, type: 'AssessmentMBS' },
  { name: 'Questionnaire 2', order: 3, id: 3, type: 'AssessmentQuestionnaire' },
]

puts 'Seeding Assessments'
Assessment.create(assessments)

puts 'Seeding Assessment Questions'
AssessmentQuestion.create(SeedData::AssessmentQuestions.seed)
