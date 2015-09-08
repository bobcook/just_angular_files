require 'rails_helper'

describe ActivityReminderSetting do
  it { should belong_to(:user_activity) }
end
