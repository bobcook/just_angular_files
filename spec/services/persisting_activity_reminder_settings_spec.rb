require 'rails_helper'

describe PersistingActivityReminderSettings do
  describe '#params' do
    let(:user_activity) { create(:user_activity) }

    it 'removes reminders attribute from params' do
      params = {
        reminders: 'true',
        days: [:monday]
      }
      new_params = PersistingActivityReminderSettings.new(params).params

      expect(new_params[:reminders]).to be_nil
      expect(new_params[:days]).to eq([:monday])
    end

    context 'with reminders' do
      it 'does not change the params values' do
        params = {
          reminders: 'true',
          days: [:monday],
          contact_methods: [:text],
          times: [:morning],
          user_activity_id: user_activity.id
        }
        new_params = PersistingActivityReminderSettings.new(params).params

        expect(new_params[:days]).to eq([:monday])
        expect(new_params[:contact_methods]).to eq([:text])
        expect(new_params[:times]).to eq([:morning])
        expect(new_params[:user_activity_id]).to eq(user_activity.id)
      end
    end

    context 'without reminders' do
      it 'changes the params to default values' do
        params = {
          reminders: 'false',
          days: [:monday],
          contact_methods: [:text],
          times: [:morning],
          user_activity_id: user_activity.id
        }
        new_params = PersistingActivityReminderSettings.new(params).params
        defaults = ActivityReminderSetting.default_settings

        expect(new_params[:days]).to eq(defaults[:days])
        expect(new_params[:contact_methods]).to eq(defaults[:contact_methods])
        expect(new_params[:times]).to eq(defaults[:times])
        expect(new_params[:user_activity_id]).to eq(user_activity.id)
      end
    end
  end
end
