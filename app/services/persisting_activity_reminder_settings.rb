class PersistingActivityReminderSettings
  def initialize(orig_params, settings_arg = nil)
    @orig_params = orig_params
    @orig_settings = settings_arg if settings_arg
  end

  def settings
    if reminders?
      orig_settings.assign(params)
    else
      orig_settings.reset(orig_params[:user_activity_id])
    end
  end

  private

  attr_reader :orig_params, :orig_settings

  def params
    @params ||= orig_params.except(:reminders)
  end

  def reminders?
    orig_params[:reminders] == 'Yes'
  end

  def orig_settings
    @orig_settings ||= ::ActivityReminderSetting.defaults
  end
end
