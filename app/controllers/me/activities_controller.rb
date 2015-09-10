module Me
  class ActivitiesController < Me::BaseController
    def edit; end

    def update; end

    def create
      user_activity = current_user.user_activities.new(activity: activity)

      if user_activity.save
        flash[:success] = 'Activity was saved'
        redirect_to(
          new_my_activity_reminder_settings_path(activity_id: user_activity.id)
        )
      else
        flash[:warning] = 'Activity was not saved'
        redirect_to :back
      end
    end

    private

    def activity
      @activity ||= Activity.find(activity_params[:activity_id])
    end

    def activity_params
      params.require(:user_activity).permit(:activity_id)
    end
  end
end
