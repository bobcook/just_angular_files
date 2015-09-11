# TODO: this is a WIP. Haven't implemented this controller yet.
module Api
  module V1
    module Me
      module UserActivities
        class HistoriesController < Api::V1::Me::BaseController
          def index
            history =
              UserActivityPeriod.all.where(
                user_activity_id: params[:user_activity_id]
              )
            render json: history
          end

          def show
            history =
            UserActivityPeriod.where(
              id: params[:user_activity_id],
              completed_date: start_date..end_date
            )
            render json: history
          end

          private

          def target_date
            Date.parse(params[:id])
          end

          def start_date
            target_date.at_beginning_of_week
          end

          def end_date
            target_date.at_end_of_week
          end
        end
      end
    end
  end
end
