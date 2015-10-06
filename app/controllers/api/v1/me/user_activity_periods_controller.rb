module Api
  module V1
    module Me
      class UserActivityPeriodsController < Api::V1::Me::BaseController
        def update
          user_activity_period.activity_tracker_responses =
            activity_tracker_responses

          if user_activity_period.save
            render json: user_activity_period,
                   serializer: UserActivityPeriodSerializer
          else
            render json: { errors: user_activity_period.errors.full_messages },
                   status: :unprocessable_entity
          end
        end

        private

        def user_activity_period_params
          @user_activity_period_params ||=
            params.require(:user_activity_period).permit(
              :user_activity_id,
              activity_tracker_responses: [[
                :activity_tracker_question_id,
                :response
              ]]
            )
        end

        def user_activity
          @user_activity ||=
            UserActivity.find user_activity_period_params[:user_activity_id]
        end

        def user_activity_period
          @user_activity_period ||= UserActivityPeriod.find_or_initialize_by(
            user_activity: user_activity,
            # the date + the user is the only reasonable primary key since some
            # of these records don't actually exist, they're just stubbed
            completed_date: params[:id]
          )
        end

        def activity_tracker_responses
          @activity_tracker_responses ||=
            user_activity_period_params[:activity_tracker_responses]
            .map do |response_params|
              ActivityTrackerResponse.new response_params
            end
        end
      end
    end
  end
end
