class PersistingActivityReminderSettings
  def initialize(orig_params)
    @orig_params = orig_params
  end

  def params
    if reminders?
      edited_params
    else
      ActivityReminderSetting.new.reset(orig_params[:user_activity_id])
    end
  end

  private

  attr_reader :orig_params, :orig_settings

  def edited_params
    @edited_params ||= orig_params.except(:reminders)
  end

  def reminders?
    orig_params[:reminders] == 'true'
  end
end
