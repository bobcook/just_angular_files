class UserActivitiesController < ApplicationController
  def create
    user_activity = UserActivity.new(user_activity_params)
    if user_activity.save
      flash[:success] = 'Activity was saved'
      redirect_to activity_reminder_settings_path
    else
      flash[:warning] = 'Activity was not saved'
      redirect_to :back
    end
  end

  private

  def user_activity_params
    params.require(:user_activity).permit(:activity_id, :user_id)
  end
end
