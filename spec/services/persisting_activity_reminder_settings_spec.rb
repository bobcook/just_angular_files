require 'rails_helper'

describe PersistingActivityReminderSettings do
  describe '#settings' do
    let(:user_activity) { create(:user_activity) }

    context 'with reminders' do
      it 'builds a new activity using params' do
        params = {
          reminders: 'true',
          days: [:monday],
          contact_methods: [:text],
          times: [:morning],
          user_activity_id: user_activity.id
        }
        settings = PersistingActivityReminderSettings.new(params).settings

        expect(settings.days).to eq([:monday])
        expect(settings.contact_methods).to eq([:text])
        expect(settings.times).to eq([:morning])
        expect(settings.user_activity_id).to eq(user_activity.id)
      end

      it 'assigns new values to an existing activity using params' do
        attr = {
          days: [:monday],
          contact_methods: [:text],
          times: [:morning],
          user_activity_id: user_activity.id
        }
        old_settings = create(:activity_reminder_settings, attr)

        params = {
          reminders: 'true',
          days: [:tuesday],
          contact_methods: [:email],
          times: [:afternoon],
          user_activity_id: user_activity.id
        }
        new_settings =
          PersistingActivityReminderSettings.new(params, old_settings).settings

        expect(new_settings.days).to eq([:tuesday])
        expect(new_settings.contact_methods).to eq([:email])
        expect(new_settings.times).to eq([:afternoon])
        expect(new_settings.user_activity_id).to eq(user_activity.id)
      end
    end

    context 'without reminders' do
      it 'builds a new activity using default values' do
        params = { reminders: 'false', user_activity_id: user_activity.id }
        settings = PersistingActivityReminderSettings.new(params).settings
        defaults = ActivityReminderSetting.default_settings

        expect(settings.days).to eq(defaults[:days])
        expect(settings.contact_methods).to eq(defaults[:contact_methods])
        expect(settings.times).to eq(defaults[:times])
        expect(settings.user_activity_id).to eq(user_activity.id)
      end

      it 'assigns new values to an existing activity using default values' do
        attr = {
          days: :monday,
          contact_methods: :text,
          times: :morning,
          user_activity_id: user_activity.id
        }
        old_settings = create(:activity_reminder_settings, attr)

        params = {
          reminders: 'false',
          user_activity_id: user_activity.id
        }
        new_settings =
          PersistingActivityReminderSettings.new(params, old_settings).settings
        defaults = ActivityReminderSetting.default_settings

        expect(new_settings.days).to eq(defaults[:days])
        expect(new_settings.contact_methods).to eq(defaults[:contact_methods])
        expect(new_settings.times).to eq(defaults[:times])
        expect(new_settings.user_activity_id).to eq(user_activity.id)
      end
    end
  end
end
