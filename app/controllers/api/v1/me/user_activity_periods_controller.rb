module Api
  module V1
    module Me
      class UserActivityPeriodsController < Api::V1::Me::BaseController
        def edit; end

        def create
          new_user_activity_period =
            UserActivityPeriod.find_or_initialize_by(activity_period_attrs)

          if new_user_activity_period.save
            render json: new_user_activity_period,
                   status: 202
          else
            render json:
              { errors: 'The date information was not saved. Try again.' },
                   status: 422
          end
        end

        private

        def activity_period_attrs
          # TODO: is there a better way to change javascript time to rails time?
          time = convert_js_time(activity_period_params[:completed_date])
          { completed_date: time,
            user_activity_id: activity_period_params[:user_activity_id] }
        end

        def convert_js_time(seconds)
          Time.at(seconds / 1000)
        end

        def activity_period_params
          params.require(:activity_period)
            .permit(
              :user_activity_id,
              :completed_date
            )
        end
      end
    end
  end
end
