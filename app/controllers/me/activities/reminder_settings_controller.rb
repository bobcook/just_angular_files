module Me
  module Activities
    class ReminderSettingsController < Me::BaseController
      def new
        @activity_reminder = ActivityReminderSetting.new
      end

      def create
        @activity_reminder = ActivityReminderSetting.new(settings_params)
        if @activity_reminder.save
          flash[:success] = 'activity reminder is saved'
          redirect_to create_redirect_path
        else
          flash[:warning] = 'activity reminder is not saved'
          render :new
        end
      end

      def edit
        activity_reminder
      end

      def update
        if activity_reminder.update(settings_params)
          flash[:success] = 'activity reminder is updated'
          redirect_to my_staying_sharp_path
        else
          render :edit
        end
      end

      private

      def settings_params
        PersistingActivityReminderSettings.new(reminder_params).params
      end

      def activity_reminder
        @activity_reminder ||= ActivityReminderSetting.where(
          user_activity_id:
            params[:user_activity_id] || reminder_params[:user_activity_id]
        ).first
      end

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
