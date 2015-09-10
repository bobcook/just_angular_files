module Me
  module Activities
    class ReminderSettingsController < Me::BaseController
      def new
        @activity_reminder = ActivityReminderSetting.new
      end

      def create
        settings =
          PersistingActivityReminderSettings.new(reminder_params).settings

        if settings.save
          flash[:success] = 'activity reminder is saved'
          redirect_to create_redirect_path
        else
          flash[:warning] = 'activity reminder is not saved'
          render :new
        end
      end

      def edit; end

      private

      def create_redirect_path
        params[:staying_sharp] ? my_staying_sharp_path : activities_path
      end

      def reminder_params
        params
          .require(:activity_reminder_setting)
          .permit(
            { times: [] },
            { days: [] },
            { contact_methods: [] },
            :user_activity_id,
            :reminders
          )
      end
    end
  end
end
