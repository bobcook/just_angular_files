# TODO: remove this code after migrating
namespace :data_migration do
  desc 'reset all content'
  task reset_all_content: :environment do
    puts 'destroying activities...'
    Activity.destroy_all

    puts 'desotrying games...'
    Game.destroy_all

    puts 'destroying recipes...'
    Recipe.destroy_all

    puts 'desotrying articles...'
    Article.desotry_all

    puts 'importing content...'
    ImportContentJob.perform_later
  end

  desc 'reset content'
  task reset_content: :environment do
    puts 'destroying all activities'
    Activity.where(created_at: 2.days.ago..Time.zone.now).destroy_all

    puts 'destroying all games...'
    Game.where(created_at: 2.days.ago..Time.zone.now).destroy_all

    puts 'destroying all recipes...'
    Recipe.where(created_at: 2.days.ago..Time.zone.now).destroy_all

    puts 'destroying all articles...'
    Article.where(created_at: 2.days.ago..Time.zone.now).destroy_all

    puts 'importing content...'
    ImportContentJob.perform_later
  end

  desc 'set last_modified date to a year ago'
  task update_last_modified: :environment do
    Activity.find_each do |activity|
      activity.update(last_modified: 1.year.ago)
    end
  end

  desc 're-seed Activity Tracker'
  task reseed_activity_tracker: :environment do
    ActivityTracker.find_each do |tracker|
      if tracker.name != 'binary'
        tracker.activity_tracker_questions.destroy_all
        tracker.destroy
      else
        tracker.update(cms_name: 'Binary')
      end
    end

    activity_tracker_names = ActivityTracker.default_types
    activity_tracker_names.each do |name|
      FactoryGirl.create(:activity_tracker, name.to_sym) unless name == 'binary'
    end
  end

  desc 'import activity from cms'
  task import_activity: :environment do
    Rake::Task['content_feeds:import'].execute
  end

  desc 'delete tracker responses for non-binary activities'
  task delete_non_binary_tracker_response: :environment do
    UserActivity.find_each do |user_activity|
      if user_activity.activity.activity_tracker.name != 'binary'
        user_activity.user_activity_periods.destroy_all
      end
    end
  end

  desc 'change Assessment order'
  task change_assessment_order: :environment do
    q1 = Assessment.find_by(name: 'Questionnaire 1')
    q1.update(order: 2)

    mbs = Assessment.find_by(name: 'MBS')
    mbs.update(order: 1)
  end

  desc 'add question marks to end of questions'
  task add_question_marks: :environment do
    questions = [
      'How many relatives (by birth or marriage) do you see or hear from at least once a month',
      'How many servings of fish (including shellfish) do you eat per week',
      'How often do you take prescription or over-the-counter (OTC) medications to help you sleep',
      'How often do you talk to or see the relative with whom you have the most contact',
      'Do you take fish oil or omega-3 supplements',
      'How much time do you spend per week doing aerobic exercise',
      'How many relatives (by birth or marriage) do you feel you could reach out to for help or talk with about private matters',
      'How many servings (about 1 oz) of nuts do you consume per week',
      'How much time do you spend per week doing weight or strength training',
      'Which of the following best describes your activity level at work',
      'What is your relationship status',
      'How often do you eat breakfast in a typical week',
      'How often do you experience stress at home or work',
      'How many servings of vegetables do you eat per day',
      'Do you take a supplement that contains at least 400 international units (IU) of vitamin D',
      'How many servings of processed meats do you have per week',
      'How many servings of red meats do you have per week',
      'How many servings of poultry do you have per week',
      'Are you a vegetarian or vegan',
      'How many servings of fruit do you eat per day'
    ]

    questions.each do |question|
      q = AssessmentQuestion.find_by(text: question)
      q.update(text: "#{question}?")
    end
  end

  desc 'delete some questionnaire 1 questions'
  task delete_questionnaire_1_questions: :environment do
    questions = [
      'What is your height?',
      'What is your weight?',
      'What is your gender?',
      'What is your years of education?',
      'Are you right-handed or left-handed?'
    ]

    questions.each do |question|
      q = AssessmentQuestion.find_by(text: question)
      q.destroy
    end
  end
end
