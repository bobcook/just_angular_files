require 'rails_helper'

describe ActivityReminderSetting do
  it { should belong_to(:user_activity) }

  describe '#reset' do
    let(:user_activity) { create(:user_activity) }
    let(:settings) do
      create(:activity_reminder_settings, user_activity: user_activity)
    end

    it 'sets fields to default values' do
      expect(settings.days?).to eq(true)
      expect(settings.contact_methods?).to eq(true)
      expect(settings.times?).to eq(true)

      settings.reset(user_activity.id)

      expect(settings.days?).to eq(false)
      expect(settings.contact_methods?).to eq(false)
      expect(settings.times?).to eq(false)
    end

    it 'does not change the user_activity_id' do
      expect(settings.user_activity_id).to eq(user_activity.id)

      settings.reset(user_activity.id)

      expect(settings.user_activity_id).to eq(user_activity.id)
    end
  end

  describe '#assign' do
    it 'assigns new values to a reminder' do
      settings = create(:activity_reminder_settings, days: [:monday])
      attr = { days: [:tuesday] }
      settings.assign(attr)

      expect(settings.days).to eq([:tuesday])
    end

    it 'return an instance of ActivityReminderSetting' do
      settings = create(:activity_reminder_settings)
      attr = { days: [:tuesday] }
      settings.assign(attr)

      expect(settings).to be_instance_of(ActivityReminderSetting)
    end
  end

  describe '#empty' do
    it 'is true for default' do
      subject = ActivityReminderSetting.defaults
      expect(subject.empty?).to eq(true)
    end

    it 'is true when settings match default settings' do
      subject = create(:default_settings)
      expect(subject.empty?).to eq(true)
    end

    it 'is false otherwise' do
      subject = create(:activity_reminder_settings)
      expect(subject.empty?).to eq(false)
    end
  end

  describe '.defaults' do
    it 'populates reminder with default settings' do
      settings = ActivityReminderSetting.defaults

      expect(settings.days?).to eq(false)
      expect(settings.contact_methods?).to eq(false)
      expect(settings.times?).to eq(false)
    end

    it 'does not persist the built settings' do
      settings = ActivityReminderSetting.defaults

      expect(settings.persisted?).to eq(false)
    end
  end

  context 'bitmask predicates' do
    describe '#monday?' do
      it 'is true if activity reminder is set for Monday' do
        settings = create(:activity_reminder_settings, days: :monday)

        expect(settings.monday?).to eq(true)
      end

      it 'is false if activity reminder is not set for Monday' do
        settings = create(:activity_reminder_settings, days: :tuesday)

        expect(settings.monday?).to eq(false)
      end
    end
  end
end
