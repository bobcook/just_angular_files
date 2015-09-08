class UserActivitiesController < ApplicationController
  def create
    user_activity = UserActivity.new(user_activity_params)
    if user_activity.save
      flash[:success] = 'Activity was saved'
      redirect_to new_user_activity_activity_reminder_setting_path(
        user_activity_id: user_activity.id)
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
