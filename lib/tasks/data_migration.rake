# TODO: remove this code after migrating
namespace :data_migration do
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
end
